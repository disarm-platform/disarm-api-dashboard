<template>
  <div v-bind:data-tooltip="tooltip">
    <span class='state' :class="{green: c.deployed, red: !c.deployed}" disabled>D</span>
    <span class='state' :class="{orange: c.running}">R</span>
    <span class='state' :class="{blue: c.sleeping}">S</span>
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
    tooltip(): string {
      return `${this.c.deployed ? 'deployed' : 'not deployed'} |
      ${this.c.running ? 'running' : 'not running'} | 
      ${this.c.sleeping ? 'sleeping' : 'not sleeping'}
      `;
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
  background-color: orange;
}
.blue {
  background-color: #abc5fff2;
  color: white;
}
</style>