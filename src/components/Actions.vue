<template>
  <div>
    <button @click='deploy'>Deploy</button>
    <button @click='undeploy'>Undeploy</button>
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

    <button :disabled="!c.testable" @click="test">test</button> -->
    
    </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import {deploy} from '@/deploy';
import { OutgoingCombinedRecord } from '@/types';

export default Vue.extend({
  props: {
    row: {
      type: Object as () => OutgoingCombinedRecord,
    },
  },
  methods: {
    deploy() {
      console.log('do: deploy', this.row.function_name);
      deploy(this.row);
    },
    undeploy() {
      console.log('do: undeploy', this.row.function_name);
    },
    test() {
      console.log('do: test', this.row.function_name);
    },
    logs() {
      console.log('do: logs', this.row.function_name);
    },
  },
});
</script>

<style>
button {
  font-size: 0.8em;
}
</style>