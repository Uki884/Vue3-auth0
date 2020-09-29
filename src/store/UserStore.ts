import {
  reactive,
  onMounted,
  toRefs,
  watch,
  ref,
  onBeforeMount,
  InjectionKey,
  readonly,
  computed,
  inject
} from "vue";

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
  state: any;
  isAuthenticated: boolean;
  getUser: any;
}

export const useUser = (): UseUser => {
  inject(UserKey) as UserStore;
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
    const { user, token, isLoggedIn } = (await useInitializeUser()) as {
      user: Auth0User;
      token: string;
      isLoggedIn: boolean;
    };
    state.user = user;
    state.isAuthenticated = isLoggedIn;
    state.accessToken = token;
    setUser({ user, token, isLoggedIn });
    return true;
  };

  const logout = async () => {
    await useLogout();
  };

  const user = computed(() => state.user);
  console.log(state);
  return {
    useLogin: login,
    useLogout: logout,
    useInitializeUser: initializeUser,
    ...toRefs(state),
    user
  } as any;
};

export type UserStore = ReturnType<typeof useUser>;
