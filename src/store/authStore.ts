import { defineComponent, inject } from "vue";

import { AuthKey, AuthStore } from "@/auth/index.ts";
export default () => inject(AuthKey) as AuthStore;
