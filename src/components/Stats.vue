<template>
  <div>
    <spinner v-if="loading" />
    <span v-if="!deployed" class='subtle'>--</span>
    <span
      v-else
      :class="{subtle: row.deployed_invocation_count === 0}"
    >{{row.deployed_invocation_count}}</span>
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
.subtle {
  color: lightgrey;
}
</style>