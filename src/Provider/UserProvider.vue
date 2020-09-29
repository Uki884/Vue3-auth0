<template>
  <slot></slot>
</template>

<script lang="ts">
// import { useAuth, AuthKey } from "@/auth/index.ts";
import { useUser, UserKey } from "@/store/UserStore";
import { defineComponent, SetupContext, provide } from "vue";

export default defineComponent({
  setup(props, context: SetupContext) {
    provide(UserKey, useUser());
  }
});
</script>
<style lang="scss"></style>
