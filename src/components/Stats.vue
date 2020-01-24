<template>
  <div v-if="show" class="subtle">
    <span
      :class="{highlight: row.deployed_invocation_count !== 0}"
    >{{row.deployed_invocation_count}}</span> 
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { isNull } from 'lodash';
import { CombinedRecord } from '@/types';

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
    show(): boolean {
      return !isNull(this.row.deployed_invocation_count) && !isNull(this.row.replicas);
    },

  },
});
</script>

<style scoped>
.subtle {
  color: lightgrey;
}
.highlight {
  color: #2c74d9;
}
</style>