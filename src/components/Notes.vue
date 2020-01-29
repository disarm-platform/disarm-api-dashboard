<template>
  <div>
    <!-- <span v-if='c.missing_from_airtable' class='alert'>⚠️ Missing from AirTable</span>
    <span v-else-if='!row.target_image_version' class='alert'>⚠️ Missing function image</span>
    <span v-if='c.upgradable'>Function is upgradable via deploy</span>  -->
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