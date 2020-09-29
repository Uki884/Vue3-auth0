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
  reactive
} from "vue";
// import UserProvider from "@/Provider/UserProvider.vue";
import defaultLayout from "@/layouts/default.vue";
import { useUser } from "@/store/UserStore.ts";
export default defineComponent({
  components: {
    // UserProvider,
    defaultLayout
  },
  setup(props, context) {
    const { useInitializeUser, user } = useUser();

    const isLoading = ref(false);
    const state = reactive({
      user: null
    });

    onMounted(async () => {
      isLoading.value = true;
      const result = await useInitializeUser();
      console.log(result);
      if (result) {
        isLoading.value = false;
      }
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
