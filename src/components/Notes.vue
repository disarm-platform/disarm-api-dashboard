<template>
  <div>
    <span v-if='row.missing_from_airtable' class='alert'>⚠️missing from airtable</span>
    <span v-if='row.missing_from_openfaas' class='alert'>⚠️missing from openfaas</span> 
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

<style scoped>
span {
  color: grey;
}
span.alert {
  color: orange;
}
</style>