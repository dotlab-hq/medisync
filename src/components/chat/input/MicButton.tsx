import { AudioLines } from "lucide-react";
import { useMicDictateStore } from "../stores/useMicDictate";

export function MicButton() {
    const setIsRecording = useMicDictateStore( ( state ) => state.setIsRecording );

    const handleStartRecording = () => {
        setIsRecording( true );
    };

    return (
        <AudioLines
            className="h-4 w-4 cursor-pointer hover:text-primary transition-colors"
            onClick={handleStartRecording}
        />
    );
}
