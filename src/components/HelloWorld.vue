<template>
  <div class="hello">
    {{ state }}
    <h3 @click="useLogin()">ログイン</h3>
    <h3 @click="useLogout()">ログアウト</h3>
    <router-link to="/about">about</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, watch } from "vue";
import { useUserStore } from "@/store/UserStore.ts";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props, context) {
    const {
      useLogin,
      useLogout,
      state,
      useInitializeUser,
      user
    } = useUserStore();
    return {
      useLogin,
      useLogout,
      user,
      state
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
