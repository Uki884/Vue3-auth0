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
  computed
} from "vue";
import { useRouter } from "vue-router";

interface State {
  loading: boolean;
  isAuthenticated: boolean;
  user: any;
  idToken: string;
  popupOpen: boolean;
  error: string | null;
}

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const useAuth = () => {
  const router = useRouter();
  const domain = process.env.DOMAIN || "dev-rsiqsbgw.auth0.com";
  const clientId = process.env.CLIENT_ID || "kbmDBE05qrFsZG0PesVkCVd166m8khd0";
  const redirectUri = window.location.origin + "/callback";

  const state = reactive<State>({
    loading: true,
    isAuthenticated: false,
    user: null,
    idToken: "",
    popupOpen: false,
    error: null
  });

  const auth0Client = ref();

  const createClient = async () => {
    auth0Client.value = await createAuth0Client({
      domain,
      client_id: clientId,
      audience: "",
      redirect_uri: redirectUri
    });
  };

  const useLoginWithRedirect = async () => {
    return await auth0Client.value!.loginWithRedirect();
  };

  const useLogout = async () => {
    return await auth0Client.value!.logout();
  };

  const getIdTokenClaims = async () => {
    if (state.idToken) return;
    const token = await auth0Client.value!.getIdTokenClaims();
    state.idToken = token.__raw;
    document.cookie = `token=${token.__raw}`;
  };

  const getTokenSilently = async () => {
    const token = await auth0Client.value!.getTokenSilently();
    console.log(token);
    return token;
  };
  const handleRedirectCallback = async () => {
    return await auth0Client.value!.handleRedirectCallback();
  };

  const getUser = async () => {
    const result = await auth0Client.value!.getUser();
    return result;
  };

  onMounted(async () => {
    await createClient();
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      await handleRedirectCallback();
      state.user = await getUser();
      await getIdTokenClaims();
      await router.push("/");
    }
  });

  return {
    useLoginWithRedirect,
    useLogout,
    ...toRefs(readonly(state))
  };
};

export type AuthStore = ReturnType<typeof useAuth>;
export const AuthKey: InjectionKey<AuthStore> = Symbol("AuthStore");
