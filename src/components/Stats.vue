<template>
  <div v-if='show' data-tooltip="invocations / replicas">
    <span>{{row.deployed_invocation_count}}</span> / 
    <span>{{row.available_replicas}}</span>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {isNull} from 'lodash';
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
  },
});
</script>

<style scoped>
span {
  color: grey;
}
span.active {
  color: #92d033;
}
</style>