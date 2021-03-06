
<template>
  <div>
    <div v-if="api_data">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Links</th>
            <th>State</th>
            <th>Runs</th>
            <th>Actions</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in api_data" :key="row.function_name">
            <td :data-tooltip="row.deployed_image_version">{{row.function_name}}</td>
            <td>
              <Links :row="row" />
            </td>
            <td>
              <State :row="row" />
            </td>
            <td>
              <Stats :row="row" />
            </td>
            <td>
              <Actions :row="row" />
            </td>
            <td>
              <Notes :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-else-if="errors">
      ⚠️
      {{errors}}
    </div>
    <div v-else>Loading data...</div>
    <div class="generic_link">
      <span>If you want to test a  function not listed here try the <router-link to="/generic-runner">generic function tester</router-link></span>
    </div>
    <div class="explanation">
      <strong>Explanation</strong>
      <p>
        This page reads from two sources: the
        <a
          href="https://faas.srv.disarm.io"
        >DiSARM OpenFaas deployment</a>, and the
        <a href="https://github.com/disarm-platform/algos">Algorithms registry on GitHub</a>
      </p>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import Actions from '@/components/Actions.vue';
import State from '@/components/State.vue';
import Stats from '@/components/Stats.vue';
import Notes from '@/components/Notes.vue';
import Links from '@/components/Links.vue';
import { fetch_list } from '@/controllers/list';

import { OutgoingCombinedRecord, BusActions, CustomErrors } from '@/types';
import { EventBus } from '@/lib/event_bus';

export default Vue.extend({
  name: 'list',
  components: { Actions, State, Stats, Links, Notes },
  data() {
    return {
      api_data: null as null | OutgoingCombinedRecord[],
      errors: null as null | string,
    };
  },
  async created() {
    await this.fetch_data();
  },
  mounted() {
    EventBus.$on(BusActions.refresh_list, this.fetch_data);
  },
  destroyed() {
    EventBus.$off();
  },
  methods: {
    async fetch_data() {
      try {
        EventBus.$emit(BusActions.loading_start);
        const value = await fetch_list();

        this.api_data = value;
      } catch (error) {
        this.errors = 'Trouble loading list';
        console.error(error);
      } finally {
        EventBus.$emit(BusActions.loading_end);
      }
    },
  },
});
</script>

<style scoped>
.disabled {
  color: grey;
}
.explanation {
  margin-top: 30px;
}

.generic_link{
  margin-top: 20px;
}
</style>