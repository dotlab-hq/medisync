import { useState, useCallback } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type TTSButtonProps = {
    text: string;
};

export default function TTSButton( { text }: TTSButtonProps ) {
    const [playing, setPlaying] = useState( false );
    const [loading, setLoading] = useState( false );
    const [audio, setAudio] = useState<HTMLAudioElement | null>( null );

    const handlePlay = useCallback( async () => {
        if ( playing && audio ) {
            audio.pause();
            audio.currentTime = 0;
            setPlaying( false );
            return;
        }

        if ( !text.trim() ) return;

        setLoading( true );
        try {
            const response = await fetch( "/api/chat/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( { text: text.slice( 0, 4096 ) } ),
            } );

            if ( !response.ok ) {
                throw new Error( "TTS request failed" );
            }

            const blob = await response.blob();
            const url = URL.createObjectURL( blob );
            const newAudio = new Audio( url );

            newAudio.onended = () => {
                setPlaying( false );
                URL.revokeObjectURL( url );
            };

            setAudio( newAudio );
            setPlaying( true );
            await newAudio.play();
        } catch ( err ) {
            console.error( "TTS error:", err );
            setPlaying( false );
        } finally {
            setLoading( false );
        }
    }, [text, playing, audio] );

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handlePlay}
                        disabled={loading || !text.trim()}
                    >
                        {loading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                        ) : playing ? (
                            <VolumeX className="h-3 w-3" />
                        ) : (
                            <Volume2 className="h-3 w-3" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{playing ? "Stop" : "Read aloud"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
