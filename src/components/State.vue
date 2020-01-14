<template>
  <div>
    <span v-if='c.running'>running</span>
    <span v-if='c.sleeping'>sleeping</span>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { CombinedRecord } from '../types';
export default Vue.extend({
  props: {
    row: {
      type: Object as () => CombinedRecord,
    },
  },
  computed: {
    c(): any {
      return this.row.computed;
    },
  },
});
</script>

<style>
</style>