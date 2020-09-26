<template>
  <slot></slot>
</template>

<script lang="ts">
import { useAuth, AuthKey } from "@/auth/index.ts";
import { defineComponent, SetupContext, provide } from "vue";

export default defineComponent({
  setup(props, context: SetupContext) {
    provide(AuthKey, useAuth());
  }
});
</script>
<style lang="scss"></style>
