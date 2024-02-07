import create from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
  users: any;
  isAuth: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  setUsers: (users: any) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      users: null,
      isAuth: false,
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: true,
        })),
      setUsers: (users: any) =>
        set(() => ({
          users,
        })),
      logout: () =>
        set(() => ({
          token: "",
          isAuth: false,
          users: null,
        })),
    }),
    {
      name: "auth",
    }
  )
);
