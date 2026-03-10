import { useRef, useEffect } from "react";
import "@yaireo/tagify/dist/tagify.css";
import Tagify from "@yaireo/tagify";

export interface TagifyInputProps {
    placeholder?: string;
    defaultValue?: string[];
    onChange: (tags: string[]) => void;
    id?: string;
}

export function TagifyInput({ placeholder, defaultValue, onChange, id }: TagifyInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const tagifyRef = useRef<Tagify | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;
        const instance = new Tagify(inputRef.current, {
            placeholder: placeholder ?? "Add labels…",
            maxTags: 20,
        });
        instance.on("change", () => {
            onChange(instance.value.map((t) => t.value));
        });
        if (defaultValue && defaultValue.length > 0) instance.addTags(defaultValue);
        tagifyRef.current = instance;
        return () => {
            instance.destroy();
            tagifyRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <input
            ref={inputRef}
            id={id}
            aria-label={placeholder ?? "Add labels"}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
    );
}
