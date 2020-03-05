<template>
  <div id="app">
    <div class="flex two nav">
      <div>
        <a style="font-weight: 900;" href="/">DiSARM Dashboard</a>
      </div>
      <div class="half" style="text-align: right;">
        <router-link to="logout" v-if="$store.getters.logged_in && $route.name !== 'login'">Logout</router-link>
        <router-link
          class="login-link"
          to="login"
          v-if="!$store.getters.logged_in && $route.name !== 'login'"
        >Login</router-link>
      </div>
    </div>

    <keep-alive include="list">
      <router-view class="content" />
    </keep-alive>

    <footer class="subtle">version {{version}}</footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
    };
  },
});
</script>


<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8em;
  max-width: 960px;
  margin: 0 auto;
}
.nav {
  background: #f1f1f1;
  height: 35px;
  padding: 8px;
}
.content {
  padding-top: 10px;
}
.subtle {
  text-align: right;
  color: lightgray;
}
.login-link {
  color: lightblue;
}
</style>
