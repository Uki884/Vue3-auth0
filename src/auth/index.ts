import createAuth0Client, { Auth0Client } from "@auth0/auth0-spa-js";
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
import { useRouter } from "vue-router";

interface State {
  loading: boolean;
  isAuthenticated: boolean;
  user: any;
  idToken: string;
  popupOpen: boolean;
  error: string | null;
  auth0Client: Auth0Client | null;
}

// export const AuthKey: InjectionKey<Auth0> = Symbol("Auth0");
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const useAuth = () => {
  const domain = process.env.DOMAIN || "dev-rsiqsbgw.auth0.com";
  const clientId = process.env.CLIENT_ID || "kbmDBE05qrFsZG0PesVkCVd166m8khd0";
  const redirectUri = window.location.origin + "/callback";

  const state = reactive<State>({
    loading: false,
    isAuthenticated: false,
    user: null,
    idToken: "",
    popupOpen: false,
    error: null,
    auth0Client: null
  });

  const createClient = async () => {
    if (state.auth0Client) return;
    state.auth0Client = await createAuth0Client({
      domain,
      client_id: clientId,
      audience: "",
      redirect_uri: redirectUri
    });
  };

  const loginWithRedirect = async () => {
    return await state.auth0Client!.loginWithRedirect();
  };

  const logout = async () => {
    state.isAuthenticated = false;
    return state.auth0Client!.logout();
  };

  const getIdTokenClaims = async () => {
    if (state.idToken) return;
    const token = await state.auth0Client!.getIdTokenClaims();
    state.idToken = token.__raw;
    document.cookie = `token=${token.__raw}`;
    return token.__raw;
  };

  const getTokenSilently = async () => {
    const token = await state.auth0Client!.getTokenSilently();
    console.log(token);
    return token;
  };
  const handleRedirectCallback = async () => {
    return await state.auth0Client!.handleRedirectCallback();
  };

  const getUser = async () => {
    const result = await state.auth0Client!.getUser();
    return result;
  };

  const isAuthenticated = async () => {
    return await state.auth0Client!.isAuthenticated();
  };

  const initializeUser = async () => {
    if (!state.auth0Client) {
      await createClient();
    }
    const isAuth = await isAuthenticated();
    if (!isAuth) return;
    const user: Auth0User = await getUser();
    const token: string | undefined = await getIdTokenClaims();
    const isLoggedIn: boolean = await isAuthenticated();
    return {
      user,
      token,
      isLoggedIn
    };
  };

  onMounted(async () => {
    await createClient();
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=") && !state.loading) {
      await handleRedirectCallback();
      window.location.href = "/";
    }
  });

  return {
    useLoginWithRedirect: loginWithRedirect,
    useLogout: logout,
    useIsAuthenticated: isAuthenticated,
    useInitializeUser: initializeUser
  };
};
