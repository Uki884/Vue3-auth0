import { reactive, InjectionKey, inject, computed, ComputedRef } from "vue";

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
  user: ComputedRef<User | null>;
  isAuthenticated: ComputedRef<boolean>;
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

  const user = computed(() => state.user);
  const isAuthenticated = computed(() => state.isAuthenticated);

  const login = async () => {
    await useLoginWithRedirect();
  };

  const setUser = (payload: {
    user: User;
    isLoggedIn: boolean;
    token: string;
  }) => {
    state.user = payload.user;
    state.isAuthenticated = payload.isLoggedIn;
    state.accessToken = payload.token;
  };

  const initializeUser = async (): Promise<void> => {
    try {
      if (!state.user) new Error("Please Login");
      const result = await useInitializeUser();
      if (!result) new Error("Please Login");
      setUser(result);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const logout = async () => {
    await useLogout();
  };

  return {
    useLogin: login,
    useLogout: logout,
    useInitializeUser: initializeUser,
    user,
    isAuthenticated
  };
};

export type UserStore = ReturnType<typeof useUser>;

export const useUserStore = () => {
  const store = inject(UserKey) as UserStore;
  if (!store) {
    throw new Error("useCount() is called without provider.");
  }
  return store;
};
