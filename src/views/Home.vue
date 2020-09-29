<template>
  <div id="index">
    <HelloWorld />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
// import { useAuth, AuthKey } from "@/auth/index.ts";
import HelloWorld from "@/components/HelloWorld.vue";
export default defineComponent({
  name: "Home",
  components: {
    HelloWorld
  },
  setup(props, context) {
    // useAuth()
    return {};
  }
});
</script>
