import { create } from "zustand";

interface FileStore {
    files: File[];
    hasFiles: boolean;
    addFile: ( file: File ) => void;
    addFiles: ( files: File[] ) => void;
    removeFile: ( file: File ) => void;
    clearFiles: () => void;
}

export const useFileStore = create<FileStore>()( ( set ) => ( {
    files: [],
    hasFiles: false,

    addFile: ( file: File ) =>
        set( ( state ) => {
            const newFiles = [...state.files, file];
            return { files: newFiles, hasFiles: newFiles.length > 0 };
        } ),

    addFiles: ( files: File[] ) =>
        set( ( state ) => {
            const newFiles = [...state.files, ...files];
            return { files: newFiles, hasFiles: newFiles.length > 0 };
        } ),

    removeFile: ( fileToRemove: File ) =>
        set( ( state ) => {
            const newFiles = state.files.filter( ( f ) => f !== fileToRemove );
            return { files: newFiles, hasFiles: newFiles.length > 0 };
        } ),

    clearFiles: () => set( { files: [], hasFiles: false } ),
} ) );
