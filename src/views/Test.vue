<template>
  <div>
    <h3>{{ title }}</h3>
    <h4 v-if="showFetchTestReqRes">{{ test_req_response }}</h4>

    <div v-if="!showResults || showFetchTestReqRes">
      
      <textarea v-model="test_req" rows="20" @input="changed" placeholder="test_req.json" :disabled="!working"></textarea>
      <footer v-if="working">
        <button class="dangerous" @click="$router.go(-1)">Cancel</button>
        <button class="success"  :disabled="!request_valid" @click="test">Go!</button>
        <span class="negative" v-if="!request_valid">input is not valid json</span>
      </footer>
    </div>

    <div v-if="showResults">
      <div>
        <pre>{{formattedResponse}}</pre>
      </div>
      <button @click="$router.go(-1)">Go Back</button>
    </div>
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
      response: null as null | string,
      working: true,
      test_req_response: '',
      title: '',
      request_valid:false
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
    formattedResponse():string{
      if(this.response === null){
        return '';
      };
      try{
        return JSON.stringify(JSON.parse(this.response), null, 2)
      }catch{
        return this.response;
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
    this.try_get_test_json();
  },
  methods: {
    changed(){
     this.request_valid = this.check_json_validity(this.test_req);
    },
    async try_get_test_json() {
      this.title = `fetching test_req.json for ${this.row.function_name}`;
      try {
        const value = await get_test_req_json(this.row);
        if (this.check_json_validity(value)) {
          this.test_req_response = `successfully fetched test req from repo`;
          this.test_req = value;
        } else {
          this.test_req_response = `Test req could not be found, check if repo exists and test_req is on the root folder`;
          this.test_req = JSON.stringify({});
        }
        this.changed();
      } catch (error) {
        throw error;
      }
    },
    async test() {
      this.test_req_response = '';
      this.working = false;
      this.title = `Testing ${this.row.function_name}...`;

      try {
        this.response = await test(this.row.function_name, JSON.parse(this.test_req));
        this.title = `Results`;
      } catch (error) {
        throw error;
      }
    },
    check_json_validity(json: any): boolean {
      try {
        const obj = JSON.parse(json);
        return (obj && typeof obj === 'object' && obj !== null);
      } catch (err) {
        return false;
      }
    },
  },
});
</script>