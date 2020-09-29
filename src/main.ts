import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { useUser, UserKey } from "@/store/UserStore";

createApp(App)
  .use(store)
  .use(router)
  .provide(UserKey, useUser())
  .mount("#app");
