<template>
  <div v-bind:data-tooltip="tooltip">

  <spinner v-show="loading"/>
    <!-- <span class="state" :class="{green: row., red: !c.deployed}" disabled>D</span>
    <span class="state" :class="{orange: c.running}">R</span> -->
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {isNull} from 'lodash';
import { OutgoingCombinedRecord } from '@/types';
import Spinner from '@/components/Spinner.vue';
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
    }
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