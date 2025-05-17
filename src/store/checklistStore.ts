import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChecklistItem {
  task: string;
  status: string;
  link: string;
}

interface ChecklistStore {
  checklist: ChecklistItem[];
  updateChecklistStatus: (task: string, newStatus: string) => void;
  setChecklist: (checklist: ChecklistItem[]) => void;
}

export const useChecklistStore = create<ChecklistStore>()(
  persist(
    (set) => ({
      checklist: [
        {
          task: "Find your Ikigai",
          status: "Not Started",
          link: "/ikigai",
        },
        {
          task: "Review summary",
          status: "Not Started",
          link: "/ikigai/results",
        },
        {
          task: "Explore roles",
          status: "Not Started",
          link: "/ikigai/explore",
        },
      ],
      updateChecklistStatus: (task: string, newStatus: string) =>
        set((state) => ({
          checklist: state.checklist.map((item) =>
            item.task === task ? { ...item, status: newStatus } : item
          ),
        })),
      setChecklist: (checklist: ChecklistItem[]) => set({ checklist }),
    }),
    {
      name: "checklist-storage",
    }
  )
);
