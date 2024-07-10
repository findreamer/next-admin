import { create } from "zustand";

type State = {
  token: string;
};

type Action = {
  setToken: (token: string) => void;
};

export const useStore = create<State & Action>((set) => ({
  token: "",
  setToken: (token) => {
    set({ token });
  },
}));
