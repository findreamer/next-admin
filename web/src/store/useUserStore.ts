import { getToken, setToken } from "@/utils";
import { create } from "zustand";
import { login, getInfo, logout } from "@/api";

export type State = {
  token: string;
  name: string;
  avatar: string;
  roles: string[];
  permissions: string[];
};

export type Actions = {
  login: (params: Parameters<typeof login>[0]) => void;
  getInfo: () => {};
  logout: () => void;
};
export const useUserStore = create<State & Actions>((set) => ({
  token: getToken() || "",
  name: "",
  avatar: "",
  roles: [],
  permissions: [],
  async login(data) {
    try {
      const res = await login(data);
      if (res.data.status === 200) {
        set({ token: res.data.data.token });
        setToken(res.data.data.token);
      }
    } catch (error) {}
  },
  getInfo() {},
  logout() {},
}));
