import { create } from "zustand";

export const useMotionStore = create((set) => ({
  motions: [],
  setMotion: (motions) => set({ motions }),

  fetchMotions: async () => {
    try {
      const res = await fetch("api/motions");
      const data = await res.json();
      if (data.success) {
        set({ motions: data.data });
      } else {
        console.error("API did not return success:", data.message);
        set({ motions: [] }); // Reset to empty if API call was not successful
      }
    } catch (error) {
      console.error("Error fetching motions:", error);
      set({ motions: [] }); // Reset to empty on any error
    }
  },
}));
