import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserInterface } from "@/types";

interface AuthStoreActions {
  setUser: (user: UserInterface) => void;
}

interface AuthStoreInterface {
  user: UserInterface | null;
  setUser: (user: UserInterface) => void;
}

export const useAuthStore = create<AuthStoreInterface>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
