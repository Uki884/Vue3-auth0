<template>
  <div v-if="isLoading">ローディング</div>
  <component v-if="!isLoading" :is="layout" />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  watchEffect,
  ref,
  reactive,
  onBeforeMount
} from "vue";
import defaultLayout from "@/layouts/default.vue";
import { useUserStore } from "@/store/UserStore.ts";

export default defineComponent({
  components: {
    defaultLayout
  },
  setup(props, context) {
    const { useInitializeUser, user } = useUserStore();
    const isLoading = ref(false);

    onBeforeMount(async () => {
      isLoading.value = true;
      const result = await useInitializeUser();
      isLoading.value = false;
    });

    const layout = computed(() => {
      return "defaultLayout";
    });

    return {
      layout,
      user,
      isLoading
    };
  }
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
