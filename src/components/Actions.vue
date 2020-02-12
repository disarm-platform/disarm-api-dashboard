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
import CONFIG from '@/config';
import { undeploy } from '@/undeploy';
import { EventBus } from '@/event_bus';
import router from '@/router';
import { OutgoingCombinedRecord } from '@/types';

export default Vue.extend({
  props: {
    row: {
      type: Object as () => OutgoingCombinedRecord,
    },
  },
  methods: {
    deploy() {
      router.push({ name: 'deploy', params: { row: this.row as any} });
    },
    async undeploy() {
      router.push({ name: 'undeploy', params: { row: this.row as any} });
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