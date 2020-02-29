<template>
  <div>
    <h3>Deploying: {{row.function_name}}</h3>

    <Requester :row="row" :fn="deploy" :get_sample="get_params" @refresh_list="refresh_list" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { deploy, get_params } from '@/deploy';
import { OutgoingCombinedRecord, BusActions } from '@/types';
import Requester from '@/components/Requester.vue';
import { EventBus } from '@/event_bus';

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
  methods: {
    refresh_list() {
      EventBus.$emit(BusActions.refresh_list);
    },
  },
});
</script>