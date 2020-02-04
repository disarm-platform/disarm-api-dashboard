
<template>
  <div>
    <Modal :message="message" />
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
              <a :href="logs_url(row.function_name)" target="_blank">logs</a>
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
import Modal from '@/components/Modal.vue';
import State from '@/components/State.vue';
import Stats from '@/components/Stats.vue';
import Notes from '@/components/Notes.vue';
import { logs_url } from '@/logs_url';
import { fetch_list } from '@/list';

import { OutgoingCombinedRecord, FunctionActions } from '../types';
import { EventBus } from '@/event_bus';

export default Vue.extend({
  components: { Actions, State, Stats, Modal, Notes },
  data() {
    return {
      api_data: null as null | OutgoingCombinedRecord[],
      message: 'fetching functions...',
    };
  },
  computed: {
    deployed(): boolean {
      return Math.random() > 0.5;
    },
  },
  mounted() {
    // EventBus.$on(FunctionActions.loading_start, this.show_modal);
    // EventBus.$on(FunctionActions.loading_end, this.fetch_data);
    // const url = `${CONFIG.api_url}/list`;
    // const data = await fetch(url);
    // const json = await data.json();
    // this.api_data =  json;
    this.fetch_data(this.message);
  },
  destroyed() {
    EventBus.$off();
  },
  methods: {
    logs_url(function_name: string): string {
      const href = logs_url(function_name);
      return href;
    },
    fetch_data(message: string) {
      this.message = message;
      console.log(message);
      fetch_list().then((value) => this.api_data = value);
    },
  },
});
</script>

<style scoped>
.disabled {
  color: grey;
}
</style>