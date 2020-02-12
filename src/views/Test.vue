<template>
  <div>
    <h3>{{ title }}</h3>
    <h4 v-if="showFetchTestReqRes">{{ test_req_response }}</h4>
    <article class="card" v-if="test_req">
      <div v-if="!showResults || showFetchTestReqRes">
        <textarea v-model="test_req" rows="20" placeholder="test_req.json"></textarea>
        <footer v-if="working">
          <button class="dangerous" @click="goBack">Cancel</button>
          <button class="success" @click="test">Go!</button>
        </footer>
      </div>
      <div v-if="showResults">
        <div>
          <textarea v-model="response" rows="20" placeholder="test_response"></textarea>
        </div>
        <button @click="$router.go(-1)">Go Back</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { OutgoingCombinedRecord, BusActions } from '@/types';
import { get_test_req_json, test } from '@/test';
import router from '@/router';
import { EventBus } from '../event_bus';
export default Vue.extend({
  name: 'test',
  data() {
    return {
      test_req: null as null | any,
      response: null as null | any,
      working: true,
      test_req_response: '',
      title: '',
    };
  },
  props: {
    row: Object as () => OutgoingCombinedRecord,
  },
  computed: {
    showFetchTestReqRes() {
      if (!this.test_req_response || this.test_req_response === '') {
        return false;
      } else {
        return true;
      }
    },
    showResults() {
      if (!this.response || this.response === null) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.title = `fetching test_req.json for ${this.row.function_name}`;
    try {
      get_test_req_json(this.row).then((value) => {
        if (this.check_json_validity(value)) {
          this.test_req_response = `successfully fetched test req from repo`;
          this.test_req = value;
        } else {
          this.test_req_response = `Test req could not be found, check if repo exists and test_req is on the root folder`;
          this.test_req = JSON.stringify({});
        }
      });
    } catch (error) {
      throw error;
    }
  },
  methods: {
    async test() {
      this.test_req_response = '';
      this.working = false;
      this.title = `Testing ${this.row.function_name}...`;

      if (!this.check_json_validity(this.test_req)) {
        return this.response = 'invalid JSON';
      }

      try {
        EventBus.$emit(BusActions.loading_start);
        const value = await test(this.row.function_name, JSON.parse(this.test_req));
        this.response = value;
        this.title = `Results`;
      } catch (error) {
        throw error;
      } finally {
        EventBus.$emit(BusActions.loading_end);
      }
    },
    check_json_validity(json: any) {
      try {
        const obj = JSON.parse(json);
        if (obj && typeof obj === 'object' && obj !== null) {
          return true;
        }
      } catch (err) {
        console.error(err);
      }
      return false;
    },
  },
});
</script>