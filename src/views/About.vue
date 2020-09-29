<template>
  <div class="about">
    {{ state }}
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, watch } from "vue";
import { useUserStore } from "@/store/UserStore.ts";

export default defineComponent({
  props: {
    msg: String
  },
  setup(props, context) {
    const { useLogin, useLogout, user, state } = useUserStore();
    return {
      useLogin,
      useLogout,
      user,
      state
    };
  }
});
</script>
