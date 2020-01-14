<template>
  <div v-if="show" v-bind:data-tooltip='tooltip' class="subtle">
    <span
      :class="{highlight: row.deployed_invocation_count !== 0}"
    >{{row.deployed_invocation_count}}</span> /
    <span :class="{highlight: row.available_replicas !== 0}">{{row.available_replicas}}</span> /
    <span :class="{highlight: row.scale_to_zero}">{{row.scale_to_zero ? 'Y' : 'N'}}</span>
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
      return !isNull(this.row.deployed_invocation_count) && !isNull(this.row.available_replicas);
    },
    tooltip(): string {
      return `${this.row.deployed_invocation_count} invocations /
      ${this.row.available_replicas} available replicas /
      ${this.row.scale_to_zero ? 'scale to zero' : 'no scale to zero'}
      `;
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