
<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <input placeholder="Login" type="text" v-model="username" />
      <input ref='password' placeholder="Password" type="password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { set_auth } from '../auth';

export default Vue.extend({
  data() {
    return {
      username: 'admin',
      password: '',
    };
  },
  mounted() {
    (this.$refs.password as any).focus();
  },
  methods: {
    submit() {
      set_auth(this.username, this.password);
      this.$router.push('list');
    },
  },
});
</script>
