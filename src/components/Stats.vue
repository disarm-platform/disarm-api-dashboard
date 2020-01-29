<template>
  <span :class="{highlight: row.deployed_invocation_count !== 0}">{{row.deployed_invocation_count}}</span>
</template>

<script lang='ts'>
import Vue from 'vue';
import { isNull } from 'lodash';
import { OutgoingCombinedRecord } from '@/types';

export default Vue.extend({
  props: {
    row: {
      type: Object as () => OutgoingCombinedRecord,
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