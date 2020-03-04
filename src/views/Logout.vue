
<template>
  <div>Logging out...</div>
</template>

<script lang='ts'>
import Vue from 'vue';
import store from '@/store';

export default Vue.extend({
  mounted() {
    store.commit.logout();
    this.$router.push('list');
  },
});
</script>
