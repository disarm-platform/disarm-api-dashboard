<template>
  <div>
    <button @click="deploy">Deploy</button>
    <button @click="undeploy">Undeploy</button>
    <!-- <button
      :disabled="!row.target_image_version"
      class="success"
      @click="deploy"
    >deploy</button>

    <button
      :disabled="!(c.deployed && row.hide_from_deploy)"
      class="warning"
      @click="undeploy"
      data-tooltip="Requires 'hide_from_deploy' checked in Airtable"
    >undeploy</button>

    <button :disabled="!c.testable" @click="test">test</button>-->
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import { deploy } from '@/deploy';
import { OutgoingCombinedRecord, FunctionActions } from '@/types';
import CONFIG from '@/config';
import { undeploy } from '@/undeploy';
import { EventBus } from '@/event_bus';

export default Vue.extend({
  props: {
    row: {
      type: Object as () => OutgoingCombinedRecord,
    },
  },
  methods: {
    async deploy() {
      // this.is_loading = true;
      EventBus.$emit(FunctionActions.loading_start, 'trying to deploying....');
      try {
        // const message = await deploy(this.row);
        // display message (optional)
        // this.is_loading = false;
        setTimeout(() => {
          EventBus.$emit(FunctionActions.loading_end, 'deployed successfully');
          // trigger list refresh
          EventBus.$emit(FunctionActions.refresh_list);

        }, 5000);
      } catch (error) {
        // display error
        // this.is_loading = false;
        EventBus.$emit(FunctionActions.loading_end, `ERROR: ${error}`);
      }
    },
    async undeploy() {
      // this.is_loading = true;

      try {
        const message = await undeploy(this.row.function_name);
        // display message (optional)
        // this.is_loading = false;
        // trigger list refresh

      } catch (error) {
        // display error
        // this.is_loading = false;
        // trigger list refresh
      }
    },
    test() {
      console.log('do: test', this.row.function_name);
    },
  },
});
</script>

<style>
button {
  font-size: 0.8em;
}
</style>