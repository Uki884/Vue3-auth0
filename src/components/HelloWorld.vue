<template>
  <div class="hello">
    user: {{ user }} {{ idToken }}
    <h3 v-if="!isAuthenticated" @click="useLoginWithRedirect()">ログイン</h3>
    <div v-if="isAuthenticated" @click="useLogout()">ログアウト</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import authStore from "@/store/authStore.ts";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props, context) {
    const {
      useLoginWithRedirect,
      user,
      idToken,
      useLogout,
      isAuthenticated
    } = authStore();
    return {
      useLoginWithRedirect,
      useLogout,
      user,
      isAuthenticated,
      idToken
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
