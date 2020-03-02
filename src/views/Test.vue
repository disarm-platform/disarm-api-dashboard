<template>
  <div>
    <h3>Testing: {{row.function_name}}</h3>

    <Requester :row="row" :fn="test" :get_sample="get_test_req_json" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { get_test_req_json, test } from '@/test';
import { OutgoingCombinedRecord } from '@/types';
import Requester from '@/components/Requester.vue';

export default Vue.extend({
  components: { Requester },
  data() {
    return {
      test,
      get_test_req_json,
    };
  },
  props: {
    row: Object as () => OutgoingCombinedRecord,
  },
});
</script>
