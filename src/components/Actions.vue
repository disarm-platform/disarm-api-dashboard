<template>
  <div>
    <button
      v-if="c.deployed && c.upgradable"
      style="min-width: 56px;"
      class="warning"
      :disabled="!(c.deployed && c.upgradable)"
      @click="upgrade"
    >upgrade</button>
    <button style="min-width: 56px;" class="success" v-else-if="!c.deployed">deploy</button>
    <button
      v-else
      style="min-width: 56px;"
      :disabled="!row.target_image_version"
      @click="deploy"
    >redeploy</button>

    <button
      :disabled="!(c.deployed && row.hide_from_deploy)"
      class="warning"
      @click="undeploy"
    >undeploy</button>
    <button :disabled="!c.testable" @click="test">test</button>
    <button :disabled="!c.deployed" @click="logs">logs</button>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { CombinedRecord } from '../types';
export default Vue.extend({
  props: {
    row: {
      type: Object as () => CombinedRecord,
    },
  },
  computed: {
    c(): any {
      return this.row.computed;
    },
  },
  methods: {
    deploy() {
      console.log('do: deploy', this.row.function_name);
    },
    undeploy() {
      console.log('do: undeploy', this.row.function_name);
    },
    upgrade() {
      console.log('do: upgrade', this.row.function_name);
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