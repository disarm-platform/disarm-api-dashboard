<template>
  <div>
    <span v-if='c.missing_from_airtable' class='alert'>⚠️ Missing from AirTable</span>
    <span v-else-if='!row.target_image_version' class='alert'>⚠️ Missing function image</span>
    <span v-if='c.upgradable'>Function is upgradable via deploy</span> 
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { CombinedRecord, ComputedSection } from '../types';
export default Vue.extend({
  props: {
    row: {
      type: Object as () => CombinedRecord,
    },
  },
  computed: {
    c(): ComputedSection {
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