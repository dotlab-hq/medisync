import { create } from 'zustand'

interface MicDictateStore {
  isRecording: boolean
  recordedBlob: Blob | null
  setIsRecording: (isRecording: boolean) => void
  setRecordedBlob: (blob: Blob | null) => void
  reset: () => void
}

export const useMicDictateStore = create<MicDictateStore>()((set) => ({
  isRecording: false,
  recordedBlob: null,

  setIsRecording: (isRecording: boolean) => set({ isRecording }),

  setRecordedBlob: (blob: Blob | null) => set({ recordedBlob: blob }),

  reset: () => set({ isRecording: false, recordedBlob: null }),
}))
