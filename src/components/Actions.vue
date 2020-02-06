<template>
  <div>
    <button
      :disabled="!row.missing_from_openfaas"
      class="success"
      @click="deploy"
    >deploy</button>

    <button
      :disabled="row.missing_from_openfaas"
      class="warning"
      @click="undeploy"
      data-tooltip="Requires 'hide_from_deploy' checked in Airtable"
    >undeploy</button>

    <button :disabled="row.missing_from_openfaas" @click="test">test</button>
  <!-- <div>
    <button
      :disabled="!row.missing_from"
      class="success"
      @click="deploy"
    >deploy</button>

    <button
      :disabled="!(c.deployed && row.hide_from_deploy)"
      class="warning"
      @click="undeploy"
      data-tooltip="Requires 'hide_from_deploy' checked in Airtable"
    >undeploy</button>

    <button :disabled="!c.testable" @click="test">test</button> -->
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import { deploy } from '@/deploy';
import { OutgoingCombinedRecord, FunctionActions } from '@/types';
import CONFIG from '@/config';
import { undeploy } from '@/undeploy';
import { EventBus } from '@/event_bus';
import router from '../router';

export default Vue.extend({
  props: {
    row: {
      type: Object as () => OutgoingCombinedRecord,
    },
  },
  methods: {
    deploy() {
      router.push({ name: 'deploy', params: { row: this.row as any} });
      // // this.is_loading = true;
      // EventBus.$emit(FunctionActions.loading_start, 'trying to deploying....');
      // try {
      //   // const message = await deploy(this.row);
      //   // display message (optional)
      //   // this.is_loading = false;
      //   setTimeout(() => {
      //     EventBus.$emit(FunctionActions.loading_end, 'deployed successfully');
      //     // trigger list refresh
      //     EventBus.$emit(FunctionActions.refresh_list);

      //   }, 5000);
      // } catch (error) {
      //   // display error
      //   // this.is_loading = false;
      //   EventBus.$emit(FunctionActions.loading_end, `ERROR: ${error}`);
      // }
    },
    async undeploy() {
      router.push({ name: 'undeploy', params: { row: this.row as any} });
      // // this.is_loading = true;

      // try {
      //   const message = await undeploy(this.row.function_name);
      //   // display message (optional)
      //   // this.is_loading = false;
      //   // trigger list refresh

      // } catch (error) {
      //   // display error
      //   // this.is_loading = false;
      //   // trigger list refresh
      // }
    },
    test() {
       router.push({ name: 'test', params: { row: this.row as any} });
    },
  },
});
</script>

<style>
button {
  font-size: 0.8em;
}
</style>