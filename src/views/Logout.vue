
<template>
  <div>Logging out...</div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  mounted() {
    this.$auth.logout();
  }
});
</script>
