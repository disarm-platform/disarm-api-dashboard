<template>
  <div>
    <button
      v-if="auth_key"
      :disabled="!row.missing_from_openfaas"
      class="success"
      @click="deploy"
    >deploy</button>

    <button
      v-if="auth_key"
      :disabled="row.missing_from_openfaas"
      class="warning"
      @click="undeploy"
      data-tooltip="Requires 'hide_from_deploy' checked in Airtable"
    >undeploy</button>

    <button :disabled="row.missing_from_openfaas" @click="test">test</button>
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
import { get_auth } from '@/auth';

export default Vue.extend({
  props: {
    row: {
      type: Object as () => OutgoingCombinedRecord,
    },
  },
  data() {
    return {
      auth_key: get_auth(),
    };
  },
  methods: {
    deploy() {
      router.push({ name: 'deploy', params: { row: this.row as any } });
    },
    async undeploy() {
      router.push({ name: 'undeploy', params: { row: this.row as any } });
    },
    test() {
      router.push({ name: 'test', params: { row: this.row as any } });
    },
  },
});
</script>

<style>
button {
  font-size: 0.8em;
}
</style>