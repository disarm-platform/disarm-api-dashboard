
<template>
  <div>
    <div v-if="api_data">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Stats</th>
            <th>Actions</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in api_data" :key="row.function_name">
            <td>
              <a v-if="row.repo" :href="row.repo" target="_blank" data-tooltip="repo link">{{row.function_name}}</a>
              <span v-else>{{row.function_name}}</span>
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
    <div v-else>Loading data</div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import { CombinedRecord } from '@/types';
import Actions from '@/components/Actions.vue';
import State from '@/components/State.vue';
import Stats from '@/components/Stats.vue';
import Notes from '@/components/Notes.vue';

import CONFIG from '@/config';

export default Vue.extend({
  components: { Actions, State, Stats, Notes },
  data() {
    return {
      api_data: null as null | CombinedRecord[],
    };
  },
  async mounted() {
    const url = process.env.VUE_APP_API_URL || CONFIG.api_url;
    const data = await fetch(url);
    const json = await data.json();
    console.table(json);
    this.api_data = json;
  },
});
</script>
