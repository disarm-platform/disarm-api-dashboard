<template>
  <div>
    <button :disabled='c.deployed' @click='deploy'>deploy</button>
    <button :disabled='!c.deployed' @click='redeploy'>redeploy</button>
    <button :disabled='!c.upgradable' @click='upgrade'>upgrade</button>
    <button :disabled='!c.testable' @click='test'>test</button>
    <button :disabled='!c.deployed' @click='logs'>logs</button>
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
    redeploy() {
      console.log('do: redeploy', this.row.function_name);
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
</style>