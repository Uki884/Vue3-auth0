import { reactive, toRefs, InjectionKey, inject } from "vue";

import { useAuth } from "@/auth";

export const UserKey: InjectionKey<UserStore> = Symbol("User");

interface State {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string;
  popupOpen: boolean;
  error: string | null;
}

interface UseUser {
  useLogin: Function;
  useLogout: Function;
  useInitializeUser: Function;
  user: any;
  isAuthenticated: boolean;
  getUser: any;
}

export const useUser = (): UseUser => {
  const { useLoginWithRedirect, useLogout, useInitializeUser } = useAuth();

  const state = reactive<State>({
    loading: false,
    isAuthenticated: false,
    user: null,
    accessToken: "",
    popupOpen: false,
    error: null
  });

  const login = async () => {
    await useLoginWithRedirect();
  };

  const setUser = (payload: any) => {
    console.log(payload);
    state.user = payload.user;
    state.isAuthenticated = payload.isLoggedIn;
    state.accessToken = payload.token;
  };

  const initializeUser = async () => {
    if (state.user) return;
    const result = await useInitializeUser();
    console.log(result);
    if (!result) return;
    state.user = result.user;
    state.isAuthenticated = result.isLoggedIn;
    state.accessToken = result.token as string;
    return true;
  };

  const logout = async () => {
    await useLogout();
  };

  return {
    useLogin: login,
    useLogout: logout,
    useInitializeUser: initializeUser,
    ...toRefs(state)
  } as any;
};

export type UserStore = ReturnType<typeof useUser>;

export const useUserStore = () => {
  const store = inject(UserKey) as UserStore;
  if (!store) {
    throw new Error("useCount() is called without provider.");
  }
  return store;
};
