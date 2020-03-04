<template>
  <div>
    <span
      v-if="row.missing_from_algos"
      class="alert"
      data-tooltip="Missing from GitHub algo registry"
    >⚠️</span>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
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
span {
  color: grey;
}
span.alert {
  color: orange;
}
</style>