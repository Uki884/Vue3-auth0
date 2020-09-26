<template>
  <div id="index">
    <HelloWorld />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import authStore from "@/store/authStore.ts";
import HelloWorld from "@/components/HelloWorld.vue";
export default defineComponent({
  name: "Home",
  components: {
    HelloWorld
  },
  setup(props, context) {
    const useAuth = authStore();
    return {};
  }
});
</script>
