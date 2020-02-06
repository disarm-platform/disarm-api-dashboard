<template>
  <div>
    <h3>{{ title }}</h3>
    <h4 v-if="showFetchTestReqRes">{{ test_req_response }}</h4>
    <article class="card" v-if="test_req">
      <div v-if="!showResults || showFetchTestReqRes">
        <textarea v-model="test_req" rows="20" placeholder="Textarea"></textarea>
        <footer>
          <button class="dangerous" @click="goBack">Cancel</button>
          <button class="success" @click="test">Go!</button>
        </footer>
      </div>
      <div v-if="showResults">
        <div>{{ response }}</div>
        <button @click="goBack">Go Back</button>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { OutgoingCombinedRecord } from '@/types';
import { get_test_req_json, test } from '@/test';
import router from '@/router';
export default Vue.extend({
  data() {
    return {
      test_req: null as null | any,
      response: '',
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
      if (!this.response || this.response === '') {
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
    test() {
      this.title = `Testing ${this.row.function_name}...`;
      if (this.check_json_validity(this.test_req)) {
        this.test_req_response = '';
        test(this.row.function_name, JSON.parse(this.test_req)).then((value) => console.log(value));
      } else {
        this.response = 'invalid JSON';
      }
    },
    goBack() {
      router.go(-1);
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