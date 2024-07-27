import { getToken, remveToken, setToken } from "@/utils";
import { create } from "zustand";
import { login, getInfo, logout, register } from "@/api";
import DefaultAvatar from "@/assets/images/profile.jpg";

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
  register: (params: Parameters<typeof register>[0]) => void;
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

  async register(params) {
    try {
      const res = await register(params);
      if (res.data.status === 200) {
        set({ token: res.data.data.token });
        setToken(res.data.data.token);
      }
    } catch (error) {}
  },
  async getInfo() {
    try {
      const res = (await getInfo()) as any;
      const user = res.user;
      const avatar = user.avatar || DefaultAvatar;
      let roles = [];
      let permissions = [];
      if (res.roles && res.roles.length > 0) {
        // 验证返回的roles是否是一个非空数组
        roles = res.roles;
        permissions = res.permissions;
      } else {
        roles = ["ROLE_DEFAULT"];
      }
      const info = {
        roles,
        permissions,
        name: user.userName,
        avatar,
      };
      set(info);
      return info;
    } catch (error) {
      console.log(error);
    }
  },
  async logout() {
    try {
      await logout();
      set({ token: "", roles: [], permissions: [] });
      remveToken();
    } catch (error) {
      console.log(error);
    }
  },
}));
