
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
            <th>stack.yml</th>
            <th>test_req.json</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in api_data" :key="row.function_name">
            <td>{{row.function_name}}</td>
            <td>
              <a
                v-if="row.repo"
                :href="row.repo"
                target="_blank"
                v-bind:data-tooltip="row.repo"
              >repo</a>
              <span v-else class="disabled">repo</span>
              |
              <a
                v-if="deployed"
                :href="`https://faas.srv.disarm.io/functions/${row.function_name}`"
                target="_blank"
              >fn</a>
              <span v-else class="disabled">fn</span>
              |
              <a
                :href="logs_url(row.function_name)"
                target="_blank"
              >logs</a>
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
            <td>stack.yml</td>
            <td>test_req.json</td>
            <td>
              <Notes :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Loading data</div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import Actions from '@/components/Actions.vue';
import State from '@/components/State.vue';
import Stats from '@/components/Stats.vue';
import Notes from '@/components/Notes.vue';
import {logs_url} from '@/logs_url';

import CONFIG from '@/config';
import { OutgoingCombinedRecord } from '../types';

export default Vue.extend({
  components: { Actions, State, Stats, Notes },
  data() {
    return {
      api_data: null as null | OutgoingCombinedRecord[],
    };
  },
  computed: {
    deployed(): boolean {
      return Math.random() > 0.5;
    },
  },
  async mounted() {
    const list_url = `${process.env.VUE_APP_API_URL || CONFIG.api_url}/list`;
    const data = await fetch(list_url);
    const json = await data.json();
    this.api_data = json;
  },
  methods: {
    logs_url(function_name: string): string {
      const href = logs_url(function_name);
      return href;
    },
  },
});
</script>

<style scoped>
.disabled {
  color: grey;
}
</style>