<template>
  <AuthProvider>
    <router-view></router-view>
  </AuthProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthProvider from "@/Provider/AuthProvider.vue";
export default defineComponent({
  components: {
    AuthProvider
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
