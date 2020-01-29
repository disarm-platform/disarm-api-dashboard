<template>
  <div v-bind:data-tooltip="tooltip">
    <!-- <span class="state" :class="{green: c.deployed, red: !c.deployed}" disabled>D</span>
    <span class="state" :class="{orange: c.running}">R</span> -->
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {isNull} from 'lodash';
import { OutgoingCombinedRecord } from '@/types';

export default Vue.extend({
  props: {
    row: {
      type: Object as () => OutgoingCombinedRecord,
    },
  },
  computed: {
    tooltip(): string {
      return 'tip';
      // return `${this.c.deployed ? 'deployed' : 'not deployed'}
      // ${isNull(this.row.replicas) ? '' : '(' + this.row.replicas + ' replicas)'}
      // |
      // ${this.c.running ? 'running' : 'not running'}
      // `;
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