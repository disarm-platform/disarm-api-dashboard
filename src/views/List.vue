
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
            <td>{{row.function_name}}</td>
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
    <div v-else-if="auth_error">
      Problem with credentials
      Try logging-in
      <a href="/logout">Login</a>
    </div>
    <div v-else>Loading data...</div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

import Actions from '@/components/Actions.vue';
import State from '@/components/State.vue';
import Stats from '@/components/Stats.vue';
import Notes from '@/components/Notes.vue';
import Links from '@/components/Links.vue';
import { fetch_list } from '@/list';

import { OutgoingCombinedRecord, BusActions, CustomErrors } from '@/types';
import { EventBus } from '@/event_bus';

export default Vue.extend({
  name: 'list',
  components: { Actions, State, Stats, Links, Notes },
  data() {
    return {
      auth_error: null as null | string,
      api_data: null as null | OutgoingCombinedRecord[],
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
        if (error.name === CustomErrors.Auth) {
          this.auth_error = error.message;
          return;
        }
        throw error;
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
</style>