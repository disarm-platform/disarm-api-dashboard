<template>
  <div v-bind:data-tooltip="tooltip">
    <spinner v-show="loading" />
    <div v-show="!loading">
      <span class="state" :class="{green: !running, red: running}" disabled>D</span>
      <span class="state" :class="{orange: running}">R</span>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { isNull } from 'lodash';
import { OutgoingCombinedRecord, FunctionActions } from '@/types';
import Spinner from '@/components/Spinner.vue';
import { EventBus } from '@/event_bus';
export default Vue.extend({
  components: { Spinner },
  props: {
    row: {
      type: Object as () => OutgoingCombinedRecord,
    },
  },
  data() {
    return {
      loading: false as boolean,
    }
  },
  computed: {
    tooltip(): string {
      let replicas = 0;
      if (this.row.replicas) {
        replicas = this.row.replicas;
      }
      return `${replicas > 0 ? 'deployed' : 'not deployed'}
      ${!isNull(this.row.replicas) ? '' : '(' + this.row.replicas + ' replicas)'}
      |
      ${this.running ? 'running' : 'not running'}
      `;
    },
    running() {
      if (this.row.replicas) {
        return this.row.replicas > 0;
      }
      return false;
    },
  },
  mounted() {
    EventBus.$on(FunctionActions.loading_start, this.toggleLoading);
    EventBus.$on(FunctionActions.loading_end, this.toggleLoading);
  },
  destroyed() {
    EventBus.$off();
  },
  methods: {
    toggleLoading(value: boolean) {
      this.loading = value;
    },
  },
});
</script>

<style scoped>
.state {
  padding: 5px;
  background-color: gainsboro;
  color: #ececec;
}
.red {
  background-color: #ffb0b0;
  color: white;
}
.green {
  background-color: #ade68f;
  color: white;
}
.orange {
  background-color: #f7daa6;
  color: white;
}
.blue {
  background-color: #abc5fff2;
  color: white;
}
</style>