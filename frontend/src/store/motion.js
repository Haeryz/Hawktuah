import { create } from "zustand";

export const useMotionStore = create((set) => ({
    motions: [],
    setMotion: (motions) => set({ motions }),

    fetchMotions: async () => {
        const res = await fetch("api/motions");
        const data = await res.json();
        if (data.success) {
            set({ motions: data.data })
        } else {
            console.error("Failed to fetch products:", data.message);
        }
    }
}))