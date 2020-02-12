<template>
  <div>
    <article class="card">
      <div v-if="!showResults">
        <h3>Are you sure you want to undeploy function {{ row.function_name }}?</h3>
        <footer v-if="working">
          <button class="dangerous" @click="goBack">Cancel</button>
          <button class="warning" @click="undeploy">Go!</button>
        </footer>
      </div>
      <div v-if="showResults">
        <h3>Results</h3>
        <div>{{ response }}</div>
        <button @click="goBack">Go Back</button>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { OutgoingCombinedRecord, BusActions } from '@/types';
import router from '@/router';
import { undeploy } from '@/undeploy';
import { EventBus } from '@/event_bus';
export default Vue.extend({
  name: 'undeploy',
  props: {
    row: Object as () => OutgoingCombinedRecord,
  },
  data() {
    return {
      response: '',
      working: true,
    };
  },
  computed: {
    showResults() {
      if (!this.response || this.response === '') {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    async undeploy() {
      this.working = false;
      EventBus.$emit(BusActions.loading_start, true);
      try {
        const value = await undeploy(this.row.function_name);
        this.response = value;
        EventBus.$emit(BusActions.refresh_list);
      } catch (error) {
        EventBus.$emit(BusActions.loading_end, false);
        throw (error);
      }
    },
  },
});
</script>