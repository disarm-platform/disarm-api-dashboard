<template>
  <div>
    <a v-if="row.repo" :href="row.repo" target="_blank" v-bind:data-tooltip="row.repo">repo</a>
    <span v-else class="disabled">repo</span>
    |
    <a :href="log_url" target="_blank">logs</a>
    |
    <a href='#' @click="copy_fn_url" data-tooltip='Copy to clipboard'>run URL</a>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { OutgoingCombinedRecord } from '@/types';
import { logs_url } from '@/logs_url';
export default Vue.extend({
  props: {
    row: {
      type: Object as () => OutgoingCombinedRecord,
    },
  },
  computed: {
    log_url(): string {
      return logs_url(this.row.function_name);
    },
  },
  methods: {
    copy_fn_url() {
      const fn_url = `https://faas.srv.disarm.io/function/${this.row.function_name}`;
      navigator.clipboard.writeText(fn_url);
    },
  },
});
</script>

<style scoped>
span {
  color: grey;
}
span.alert {
  color: orange;
}
</style>