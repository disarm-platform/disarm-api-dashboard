
<template>
  <div>
    <div v-if="api_data">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Scale to zero</th>
            <th>Stats</th>
            <th>Actions</th>
            <th>Notes</th>
            <th>Repo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in api_data" :key="row.function_name">
            <td>{{row.function_name}}</td>
            <td>
              <State :row="row" />
            </td>
            <td>
              <span v-if='row.scale_to_zero'>✔️</span>
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
            <td>
              <a v-if="row.repo" :href="row.repo" target="_blank">Link</a>
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

export default Vue.extend({
  components: { Actions, State, Stats, Notes },
  data() {
    return {
      api_data: null as null | CombinedRecord[],
    };
  },
  async mounted() {
    // const url = 'https://europe-west1-disarm-platform.cloudfunctions.net/disarm-api-dashboard-api';
    const url = 'http://localhost:5000/api.json';
    const data = await fetch(url);
    const json = await data.json();
    console.table(json);
    this.api_data = json;
  },
});
</script>
