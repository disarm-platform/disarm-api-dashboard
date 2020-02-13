
<template>
  <div>Logging out...</div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { remove_auth } from '@/auth';

export default Vue.extend({
  mounted() {
    remove_auth();
    this.$router.push('list');
  },
});
</script>
