<template>
  <div id="callback">
    ログイン中...
    {{ user }}
  </div>
</template>

<script lang="ts">
import { useAuth } from "@/auth/index.ts";
import { defineComponent, onMounted, SetupContext } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup(props, context: SetupContext) {
    const router = useRouter();
    const { useLoginWithRedirect, user } = useAuth();
    console.log(router);
    return {
      useLoginWithRedirect,
      user
    };
  }
});
</script>
<style lang="scss"></style>
