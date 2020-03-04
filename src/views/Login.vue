
<template>
  <div>
    <h1>Login</h1>
    <div v-if="errors">
      <div class="errors">{{errors}}</div>
      <div>
        <router-link to="list">Back to list</router-link>
      </div>
    </div>
    <form @submit.prevent="submit" v-else>
      <input placeholder="Login" type="text" v-model="username" />
      <input ref="password" placeholder="Password" type="password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import store from '@/store';
import { login } from '@/controllers/login';

export default Vue.extend({
  data() {
    return {
      username: 'admin',
      password: '',
      errors: null as null | string,
    };
  },
  mounted() {
    (this.$refs.password as any).focus();
  },
  methods: {
    async submit() {
      const success = await login({ username: this.username, password: this.password });
      if (success) {
        store.commit.login({ username: this.username, password: this.password });
        this.$router.push('list');
      } else {
        this.errors = 'Cannot login with username and password';
      }
    },
  },
});
</script>
