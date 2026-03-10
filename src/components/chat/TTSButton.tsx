import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { generateMessageAudio } from "@/server/audio";
import { toast } from "sonner";

type TTSButtonProps = {
    messageId: string;
    text: string;
};

export default function TTSButton( { messageId, text }: TTSButtonProps ) {
    const [isPlaying, setIsPlaying] = useState( false );
    const [isLoading, setIsLoading] = useState( false );
    const [audioUrl, setAudioUrl] = useState<string | null>( null );
    const audioRef = useRef<HTMLAudioElement | null>( null );

    useEffect( () => {
        // Cleanup audio on unmount
        return () => {
            if ( audioRef.current ) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [] );

    const handlePlay = async () => {
        try {
            // If we already have the audio URL, just play it
            if ( audioUrl ) {
                playAudio( audioUrl );
                return;
            }

            // Generate or fetch cached audio
            setIsLoading( true );
            const result = await generateMessageAudio( {
                data: { messageId, content: text },
            } );

            if ( result.audioUrl ) {
                setAudioUrl( result.audioUrl );
                playAudio( result.audioUrl );

                if ( result.cached ) {
                    toast.success( "Playing cached audio" );
                }
            }
        } catch ( error ) {
            console.error( "Error playing audio:", error );
            toast.error( "Failed to generate audio" );
        } finally {
            setIsLoading( false );
        }
    };

    const playAudio = ( url: string ) => {
        if ( audioRef.current ) {
            audioRef.current.pause();
        }

        const audio = new Audio( url );
        audioRef.current = audio;

        audio.onplay = () => setIsPlaying( true );
        audio.onended = () => setIsPlaying( false );
        audio.onerror = () => {
            setIsPlaying( false );
            toast.error( "Failed to play audio" );
        };

        audio.play().catch( ( error ) => {
            console.error( "Error playing audio:", error );
            setIsPlaying( false );
            toast.error( "Failed to play audio" );
        } );
    };

    const handleStop = () => {
        if ( audioRef.current ) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying( false );
        }
    };

    if ( !text.trim() ) return null;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={isPlaying ? handleStop : handlePlay}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                        ) : isPlaying ? (
                            <VolumeX className="h-3 w-3" />
                        ) : (
                            <Volume2 className="h-3 w-3" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isPlaying ? "Stop" : "Read aloud"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
