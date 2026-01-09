import { create } from "zustand";

type AuthModal = {
	open: "" | "login" | "register";
	setOpen: (open: "" | "login" | "register") => void;
	close: () => void;
};

export const useAuthModal = create<AuthModal>((set) => ({
	open: "",
	setOpen: (open: "" | "login" | "register") => set({ open }),
	close: () => set({ open: "" }),
}));
