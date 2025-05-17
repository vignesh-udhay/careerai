import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IkigaiResult {
  summary: string;
  sentiment: string;
  suggestions: string[];
  themes: string[];
  paths: string[];
}

interface IkigaiStore {
  result: IkigaiResult | null;
  setResult: (result: IkigaiResult) => void;
  clearResult: () => void;
}

export const useIkigaiStore = create<IkigaiStore>()(
  persist(
    (set) => ({
      result: null,
      setResult: (result: IkigaiResult) => set({ result }),
      clearResult: () => set({ result: null }),
    }),
    {
      name: "ikigai-storage",
    }
  )
);
