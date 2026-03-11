import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMicDictateStore } from '../stores/useMicDictate'
import { transcribeAudio } from '@/server/audio'
import { toast } from 'sonner'

interface RecordingInterfaceProps {
  onTranscribed: (text: string) => void
}

export function RecordingInterface({ onTranscribed }: RecordingInterfaceProps) {
  const { isRecording, setIsRecording, setRecordedBlob } = useMicDictateStore()
  const [stream, setStream] = useState<MediaStream | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Request microphone access
  useEffect(() => {
    if (!isRecording) return

    const requestMic = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        setStream(mediaStream)

        // Setup media recorder
        const mediaRecorder = new MediaRecorder(mediaStream)
        mediaRecorderRef.current = mediaRecorder
        audioChunksRef.current = []

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data)
          }
        }

        mediaRecorder.start()
      } catch (error) {
        console.error('Error accessing microphone:', error)
        toast.error('Failed to access microphone')
        setIsRecording(false)
      }
    }

    requestMic()

    return () => {
      // Cleanup on unmount
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
      cleanupMic()
    }
  }, [isRecording, setIsRecording])

  // Handle saving the recording
  const handleSave = useCallback(async () => {
    try {
      if (
        !mediaRecorderRef.current ||
        mediaRecorderRef.current.state === 'inactive'
      ) {
        return
      }

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setRecordedBlob(blob)

        // Transcribe using Groq Whisper
        try {
          const audioFile = new File([blob], 'recording.webm', {
            type: 'audio/webm',
          })
          const result = await transcribeAudio({ data: { audio: audioFile } })

          if (result.text) {
            onTranscribed(result.text)
            toast.success('Voice transcribed')
          }
        } catch (error) {
          console.error('Transcription error:', error)
          toast.error('Failed to transcribe audio')
        }

        setIsRecording(false)
        cleanupMic()
      }

      mediaRecorderRef.current.stop()
    } catch (error) {
      console.error('Error saving recording:', error)
      toast.error('Failed to save recording')
      setIsRecording(false)
      cleanupMic()
    }
  }, [setRecordedBlob, setIsRecording, onTranscribed])

  // Handle discarding the recording
  const handleDiscard = useCallback(() => {
    try {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
      setIsRecording(false)
      setRecordedBlob(null)
      audioChunksRef.current = []
      cleanupMic()
    } catch (error) {
      console.error('Error discarding recording:', error)
    }
  }, [setIsRecording, setRecordedBlob])

  // Cleanup microphone resources
  const cleanupMic = useCallback(() => {
    try {
      // Stop all tracks in the media recorder's stream if it exists
      if (mediaRecorderRef.current?.stream) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track: MediaStreamTrack) => {
            track.stop()
          })
      }
      // Also stop tracks from state stream if it exists
      if (stream) {
        stream.getTracks().forEach((track: MediaStreamTrack) => {
          track.stop()
        })
      }
      setStream(null)
      mediaRecorderRef.current = null
    } catch (error) {
      console.error('Error cleaning up microphone:', error)
    }
  }, [stream])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        try {
          if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop()
          }
        } catch (error) {
          console.error('Error stopping recorder:', error)
        }
      }
      cleanupMic()
    }
  }, [isRecording, cleanupMic])

  if (!isRecording) return null

  return (
    <div className="flex items-center gap-3 w-full">
      <button
        onClick={handleDiscard}
        className={cn(
          'shrink-0 p-2 hover:bg-muted rounded-full transition-colors',
          'text-muted-foreground hover:text-destructive',
        )}
        aria-label="Discard recording"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex-1 min-w-0 h-12 bg-muted/30 px-3 flex items-center justify-center overflow-hidden rounded-lg">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm text-red-500 font-medium">Recording...</span>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={cn(
          'shrink-0 p-2 hover:bg-muted rounded-full transition-colors',
          'text-primary hover:text-primary/80',
        )}
        aria-label="Save recording"
      >
        <Check className="h-5 w-5" />
      </button>
    </div>
  )
}
