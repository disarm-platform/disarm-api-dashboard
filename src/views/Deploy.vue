<template>
  <div>
    <h3>Testing: {{row.function_name}}</h3>

    <Requester :row="row" :fn="deploy" :get_sample="get_params" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { deploy, get_params } from '@/deploy';
import { OutgoingCombinedRecord } from '@/types';
import Requester from '@/components/Requester.vue';

export default Vue.extend({
  components: { Requester },
  data() {
    return {
      deploy,
      get_params,
    };
  },
  props: {
    row: Object as () => OutgoingCombinedRecord,
  },
});
</script>