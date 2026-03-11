import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Loader2, Mic, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMicDictateStore } from '../stores/useMicDictate'
import { toast } from 'sonner'
import { transcribeAudioMessage } from '@/server/audio'

const BAR_COUNT = 48
const BAR_GAP = 2
const WAVEFORM_COLOR = '#3ab795' // Mint Leaf

interface RecordingInterfaceProps {
  onTranscribed: ( text: string ) => void
}

export function RecordingInterface( { onTranscribed }: RecordingInterfaceProps ) {
  const { isRecording, setIsRecording, setRecordedBlob } = useMicDictateStore()
  const [isTranscribing, setIsTranscribing] = useState( false )
  const [recordingSeconds, setRecordingSeconds] = useState( 0 )

  const streamRef = useRef<MediaStream | null>( null )
  const mediaRecorderRef = useRef<MediaRecorder | null>( null )
  const audioChunksRef = useRef<Blob[]>( [] )

  const audioCtxRef = useRef<AudioContext | null>( null )
  const analyserRef = useRef<AnalyserNode | null>( null )
  const animFrameRef = useRef<number>( 0 )
  const canvasRef = useRef<HTMLCanvasElement>( null )

  // Draw live waveform every animation frame
  const drawWaveform = useCallback( () => {
    const canvas = canvasRef.current
    const analyser = analyserRef.current
    if ( !canvas || !analyser ) return

    const ctx = canvas.getContext( '2d' )
    if ( !ctx ) return

    const W = canvas.width
    const H = canvas.height

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array( bufferLength )
    analyser.getByteFrequencyData( dataArray )

    ctx.clearRect( 0, 0, W, H )

    const totalBarWidth = ( W - BAR_GAP * ( BAR_COUNT - 1 ) ) / BAR_COUNT
    const barW = Math.max( totalBarWidth, 2 )
    const radius = barW / 2

    for ( let i = 0; i < BAR_COUNT; i++ ) {
      // Sample evenly across lower 60% of spectrum (most voice energy)
      const dataIndex = Math.floor( ( i / BAR_COUNT ) * ( bufferLength * 0.6 ) )
      const magnitude = dataArray[dataIndex] / 255

      // Minimum idle height = 3px so bars are always visible
      const halfH = ( H / 2 - 4 ) * magnitude + 3

      const x = i * ( barW + BAR_GAP )
      const centerY = H / 2

      ctx.fillStyle = WAVEFORM_COLOR
      ctx.globalAlpha = 0.6 + magnitude * 0.4

      // Top half
      ctx.beginPath()
      ctx.roundRect( x, centerY - halfH, barW, halfH, [radius, radius, 0, 0] )
      ctx.fill()

      // Bottom half (mirrored)
      ctx.beginPath()
      ctx.roundRect( x, centerY, barW, halfH, [0, 0, radius, radius] )
      ctx.fill()
    }

    ctx.globalAlpha = 1
    animFrameRef.current = requestAnimationFrame( drawWaveform )
  }, [] )

  // Request mic, set up AudioContext + MediaRecorder
  useEffect( () => {
    if ( !isRecording ) return
    let cancelled = false

    const start = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia( {
          audio: true,
        } )
        if ( cancelled ) {
          mediaStream.getTracks().forEach( ( t ) => t.stop() )
          return
        }

        streamRef.current = mediaStream

        // AudioContext for waveform
        const audioCtx = new AudioContext()
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 256
        analyser.smoothingTimeConstant = 0.8
        audioCtx.createMediaStreamSource( mediaStream ).connect( analyser )
        audioCtxRef.current = audioCtx
        analyserRef.current = analyser
        animFrameRef.current = requestAnimationFrame( drawWaveform )

        // MediaRecorder
        const mr = new MediaRecorder( mediaStream )
        mediaRecorderRef.current = mr
        audioChunksRef.current = []
        mr.ondataavailable = ( e ) => {
          if ( e.data.size > 0 ) audioChunksRef.current.push( e.data )
        }
        mr.start()
      } catch {
        if ( !cancelled ) {
          toast.error( 'Failed to access microphone' )
          setIsRecording( false )
        }
      }
    }

    start()
    return () => {
      cancelled = true
    }
  }, [isRecording, setIsRecording, drawWaveform] )

  // Recording timer
  useEffect( () => {
    if ( !isRecording ) {
      setRecordingSeconds( 0 )
      return
    }
    const id = setInterval( () => setRecordingSeconds( ( s ) => s + 1 ), 1000 )
    return () => clearInterval( id )
  }, [isRecording] )

  const cleanupAll = useCallback( () => {
    cancelAnimationFrame( animFrameRef.current )
    analyserRef.current?.disconnect()
    audioCtxRef.current?.close().catch( () => { } )
    audioCtxRef.current = null
    analyserRef.current = null
    streamRef.current?.getTracks().forEach( ( t ) => t.stop() )
    streamRef.current = null
    mediaRecorderRef.current = null
    audioChunksRef.current = []
  }, [] )

  useEffect( () => () => cleanupAll(), [cleanupAll] )

  const formatTime = ( s: number ) =>
    `${Math.floor( s / 60 )}:${String( s % 60 ).padStart( 2, '0' )}`

  // Stop recording → transcribe → append text
  const handleSave = useCallback( () => {
    const mr = mediaRecorderRef.current
    if ( !mr || mr.state === 'inactive' ) return

    mr.onstop = async () => {
      const blob = new Blob( audioChunksRef.current, { type: 'audio/webm' } )
      setRecordedBlob( blob )

      cancelAnimationFrame( animFrameRef.current )
      setIsTranscribing( true )

      try {
        // Convert Blob → base64 string for the server function
        const arrayBuf = await blob.arrayBuffer()
        const uint8 = new Uint8Array( arrayBuf )
        const binary = Array.from( uint8 ).map( ( b ) => String.fromCharCode( b ) ).join( '' )
        const audioBase64 = btoa( binary )

        const result = await transcribeAudioMessage( {
          data: { audioBase64, mimeType: blob.type || 'audio/webm' },
        } )

        if ( result.text ) {
          onTranscribed( result.text )
          toast.success( 'Transcript appended' )
        } else {
          toast.error( 'No speech detected' )
        }
      } catch ( err ) {
        const msg = err instanceof Error ? err.message : 'Failed to transcribe audio'
        toast.error( msg )
      } finally {
        setIsTranscribing( false )
        setIsRecording( false )
        cleanupAll()
      }
    }

    // Stop mic tracks so browser recording indicator disappears
    streamRef.current?.getTracks().forEach( ( t ) => t.stop() )
    mr.stop()
  }, [setRecordedBlob, setIsRecording, onTranscribed, cleanupAll] )

  const handleDiscard = useCallback( () => {
    if ( mediaRecorderRef.current?.state === 'recording' ) {
      mediaRecorderRef.current.stop()
    }
    cleanupAll()
    setRecordedBlob( null )
    setIsRecording( false )
  }, [setIsRecording, setRecordedBlob, cleanupAll] )

  if ( !isRecording && !isTranscribing ) return null

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Discard */}
      <button
        onClick={handleDiscard}
        disabled={isTranscribing}
        className={cn(
          'shrink-0 flex items-center justify-center h-8 w-8 rounded-full transition-colors',
          'text-muted-foreground hover:text-destructive hover:bg-destructive/10',
          isTranscribing && 'opacity-40 cursor-not-allowed',
        )}
        aria-label="Discard recording"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Waveform / transcribing indicator */}
      <div className="flex-1 min-w-0 h-12 rounded-xl bg-muted/40 flex items-center overflow-hidden px-3 gap-2">
        {isTranscribing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
            <span className="text-sm text-muted-foreground">Transcribing…</span>
          </>
        ) : (
          <>
            <Mic className="h-3.5 w-3.5 shrink-0 text-red-500 animate-pulse" />
            <canvas
              ref={canvasRef}
              width={280}
              height={40}
              className="flex-1 min-w-0 h-10"
            />
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground select-none w-10 text-right">
              {formatTime( recordingSeconds )}
            </span>
          </>
        )}
      </div>

      {/* Confirm / transcribe */}
      <button
        onClick={handleSave}
        disabled={isTranscribing}
        className={cn(
          'shrink-0 flex items-center justify-center h-8 w-8 rounded-full transition-colors',
          'text-primary hover:bg-primary/10',
          isTranscribing && 'opacity-40 cursor-not-allowed',
        )}
        aria-label="Transcribe and append"
      >
        <Check className="h-4 w-4" />
      </button>
    </div>
  )
}
