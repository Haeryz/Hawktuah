import { create } from "zustand";

export const useSystemStateStore = create((set) => ({
  systemState: null, // Initialize with null or a default state
  setSystemState: (systemState) => set({ systemState }),

  createSystemState: async () => {
    try {
      // Make a POST request to toggle the system state
      const res = await fetch("/api/system-state/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        // If successful, update the store with the new system state
        set({ systemState: data.systemState });
      } else {
        console.error("Failed to toggle system state:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },

  fetchSystemState: async () => { // Add this function
    try {
      // Make a GET request to fetch the system state
      const res = await fetch("/api/system-state");

      const data = await res.json();

      if (data.success) {
        // If successful, update the store with the fetched system state
        set({ systemState: data.systemState });
      } else {
        console.error("Failed to fetch system state:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));