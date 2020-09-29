<template>
  <div id="callback">
    ログイン中...
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from "vue";
import { useUser } from "@/store/UserStore.ts";
import { useAuth } from "@/auth/index";

export default defineComponent({
  setup(props, context: SetupContext) {
    useAuth();
    return {};
  }
});
</script>
<style lang="scss"></style>
