import createAuth0Client, {
  Auth0Client,
  IdToken,
  RedirectLoginResult
} from "@auth0/auth0-spa-js";
import { reactive, onMounted } from "vue";
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

interface UseAuth {
  useLoginWithRedirect: Function;
  useLogout: Function;
  useIsAuthenticated: Function;
  useInitializeUser: Function;
}

export const useAuth = (): UseAuth => {
  const DOMAIN = process.env.VUE_APP_AUTH0_DOMAIN;
  const CLIENT_ID = process.env.VUE_APP_AUTH0_CLIENT_ID;
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

  const createClient = async (): Promise<void> => {
    try {
      if (state.auth0Client) throw new Error("already created auth0 instance");
      state.auth0Client = await createAuth0Client({
        domain: DOMAIN,
        client_id: CLIENT_ID,
        audience: "",
        redirect_uri: redirectUri
      });
    } catch (e) {
      return e;
    }
  };

  const loginWithRedirect = async () => {
    try {
      if (!state.auth0Client) throw new Error("not created auth0 instance");
      return await state.auth0Client.loginWithRedirect();
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async (): Promise<void> => {
    state.isAuthenticated = false;
    return state.auth0Client!.logout();
  };

  const getIdTokenClaims = async (): Promise<string> => {
    let token: IdToken;
    try {
      if (state.idToken) throw new Error("already exists idToken");
      if (!state.auth0Client) throw new Error("not created auth0 instance");
      token = await state.auth0Client.getIdTokenClaims();
      state.idToken = token.__raw;
      document.cookie = `token=${token.__raw}`;
      return token.__raw;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const getTokenSilently = async (): Promise<string | undefined> => {
    if (!state.auth0Client) return;
    const token = await state.auth0Client.getTokenSilently();
    return token;
  };

  const handleRedirectCallback = async (): Promise<RedirectLoginResult> => {
    try {
      if (!state.auth0Client) throw new Error("not created auth0 instance");
      return await state.auth0Client.handleRedirectCallback();
    } catch (e) {
      return e;
    }
  };

  const getUser = async (): Promise<Auth0User> => {
    try {
      if (!state.auth0Client) throw new Error("not created auth0 instance");
      return await state.auth0Client.getUser();
    } catch (e) {
      return e;
    }
  };

  const isAuthenticated = async (): Promise<boolean> => {
    if (!state.auth0Client) new Error("not created auth0 instance");
    return await state.auth0Client!.isAuthenticated();
  };

  const initializeUser = async <T>(): Promise<{
    user: Auth0User;
    token: string;
    isLoggedIn: boolean;
  }> => {
    try {
      await createClient();
      const isAuth = await isAuthenticated();
      if (!isAuth) throw new Error("please login");
      const user: Auth0User = await getUser();
      const token = await getIdTokenClaims();
      const isLoggedIn: boolean = await isAuthenticated();

      return {
        user,
        token,
        isLoggedIn
      };
    } catch (e) {
      return e;
    }
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
