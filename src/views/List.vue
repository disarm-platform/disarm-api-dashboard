
<template>
  <div>
    <div v-if="api_data">
      <DataTable :data="api_data" :header-fields="header_fields" />
    </div>
    <div v-else>Loading data</div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
// @ts-ignore
import { DataTable } from 'v-datatable-light';

import { CombinedRecord } from '@/types';

export default Vue.extend({
  components: { DataTable },
  data() {
    return {
      api_data: null as null | CombinedRecord[],
    };
  },
  computed: {
    header_fields() {
      if (this.api_data) {
        const keys = ['function_name', 'repo', 'target_image_version', 'scale_to_zero', 'deployed_image_version',
          'deployed_invocation_count', 'available_replicas'];
        return keys;
      } else {
        return [];
      }
    },
  },
  async mounted() {
    // const url = 'https://europe-west1-disarm-platform.cloudfunctions.net/disarm-api-dashboard-api';
    const url = 'http://localhost:5000/api.json';
    const data = await fetch(url);
    const json = await data.json();
    // console.warn('got json', json);
    this.api_data = json;
  },
});
</script>
