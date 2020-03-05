<template>
  <div>
    <button
      v-if="logged_in"
      :disabled="!row.missing_from_openfaas"
      class="success"
      @click="deploy"
    >deploy</button>

    <button
      v-if="logged_in"
      :disabled="row.missing_from_openfaas"
      class="warning"
      @click="undeploy"
    >undeploy</button>

    <button :disabled="row.missing_from_openfaas" @click="test">test</button>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import { deploy } from '@/controllers/deploy';
import CONFIG from '@/lib/config';
import { undeploy } from '@/controllers/undeploy';
import { EventBus } from '@/lib/event_bus';
import router from '@/router';
import { OutgoingCombinedRecord } from '@/types';
import store from '@/store';

export default Vue.extend({
  props: {
    row: {
      type: Object as () => OutgoingCombinedRecord,
    },
  },
  computed: {
    logged_in() {
      return store.getters.logged_in;
    },
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