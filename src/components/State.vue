<template>
  <div v-bind:data-tooltip="tooltip">
    <spinner v-if="loading" />
    <div v-else>
      <span class="state" :class="{green: deployed, red: !deployed}" disabled>D</span>
      <span class="state" :class="{orange: running}">R</span>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { isNull } from 'lodash';
import { OutgoingCombinedRecord, BusActions } from '@/types';
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
      loading: false,
    };
  },
  computed: {
    tooltip(): string {
      return `${this.deployed ? 'deployed ' + this.row.replicas + ' replicas' : 'not deployed'}
      |
      ${this.running ? 'running' : 'not running'}
      `;
    },
    running(): boolean {
      return !!(this.row.replicas && this.row.replicas > 0);
    },
    deployed(): boolean {
      return this.row.hasOwnProperty('deployed_image_version');
    },
  },
  mounted() {
    EventBus.$on(BusActions.loading_start, () => this.loading = true);
    EventBus.$on(BusActions.loading_end, () => this.loading = false);
  },
  destroyed() {
    EventBus.$off();
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