
<template>
  <div>
    <h1>Login demo</h1>
    <form @submit.prevent="submit">
      <input placeholder="Login" type="text" v-model="username" />
      <input placeholder="Password" type="password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      username: undefined as string | undefined,
      password: undefined as string | undefined,
    };
  },
  methods: {
    submit() {
      this.$auth.login({
        username: this.username,
        password: this.password,
      });
    }
  },
});
</script>
