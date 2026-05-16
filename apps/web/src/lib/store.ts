import { create } from "zustand";
import type { FormatSpec } from "@kv/shared";

type UIState = {
  selectedFormatIds: string[];
  toggleFormat: (id: string) => void;
  clearFormats: () => void;

  currentStep: number; // 1..7
  setStep: (n: number) => void;

  rolePreview: "senior" | "revisora"; // toggle na tela de aprovação
  setRolePreview: (r: "senior" | "revisora") => void;
};

export const useUI = create<UIState>((set, get) => ({
  selectedFormatIds: ["f1", "f2", "f3", "f4"], // 4 pré-selecionados (dos 5 sugeridos)
  toggleFormat: (id) => {
    const cur = get().selectedFormatIds;
    if (cur.includes(id)) {
      set({ selectedFormatIds: cur.filter((x) => x !== id) });
    } else if (cur.length < 5) {
      set({ selectedFormatIds: [...cur, id] });
    }
  },
  clearFormats: () => set({ selectedFormatIds: [] }),

  currentStep: 1,
  setStep: (n) => set({ currentStep: n }),

  rolePreview: "senior",
  setRolePreview: (r) => set({ rolePreview: r }),
}));

export const isFormatPickable = (selected: string[], id: string) =>
  selected.includes(id) || selected.length < 5;

export const formatLabel = (f: FormatSpec) => `${f.width}×${f.height}`;
