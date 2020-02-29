<template>
  <div>
    <ul>
      <li v-for="(message, i) in messages" :key="i" class="message">{{message}}</li>
    </ul>

    <div class="tabs two">
      <input ref="tab1" id="tab-1" type="radio" name="tabgroupB" checked />
      <label class="pseudo button toggle" for="tab-1">Request</label>
      <input ref="tab2" id="tab-2" type="radio" name="tabgroupB" />
      <label class="pseudo button toggle" for="tab-2">Response</label>

      <div class="row">
        <!-- REQUEST -->
        <div>
          <button @click="save('request')">Save request</button>
          <button @click="$router.go(-1)">Back to list</button>

          <textarea
            v-model="request"
            rows="20"
            @input="update_validity"
            :disabled="sending_request"
          ></textarea>

          <footer v-if="!sending_request">
            <button class="success" :disabled="!request_valid" @click="do_request">Go!</button>
            <span class="notify" v-if="!request_valid && request">Input is not valid JSON</span>
          </footer>
        </div>

        <!-- RESPONSE -->
        <div>
          <button @click="save('response')">Save response</button>
          <button @click="$router.go(-1)">Back to list</button>

          <div v-if="response">
            <pre>{{formattedResponse}}</pre>
          </div>
          <div v-else-if="!sending_request">Waiting for request to be sent.</div>
          <div v-else>Waiting for request to complete...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import download from 'downloadjs';
import { OutgoingCombinedRecord } from '@/types';

export default Vue.extend({
  data() {
    return {
      sending_request: false,
      request: null as null | string,
      request_valid: false,
      response: null as null | string,
      messages: [] as string[],
    };
  },
  props: {
    row: Object as () => OutgoingCombinedRecord,
    fn: Function,
    get_sample: Function,
  },
  computed: {
    formattedResponse(): string {
      if (this.response === null) {
        return '';
      }
      try {
        return JSON.stringify(JSON.parse(this.response), null, 2);
      } catch {
        return this.response;
      }
    },
  },
  mounted() {
    this.try_get_sample();
  },
  methods: {
    update_validity() {
      this.request_valid = this.check_json_validity(this.request);
    },
    check_json_validity(json: any): boolean {
      try {
        const obj = JSON.parse(json);
        return (obj && typeof obj === 'object' && obj !== null);
      } catch (err) {
        return false;
      }
    },
    async try_get_sample() {
      this.messages.push(`Fetching source file for ${this.row.function_name}`);
      try {
        const value = await this.get_sample(this.row);
        if (this.check_json_validity(value)) {
          this.messages.push(`Successfully fetched from repo`);
          this.request = JSON.stringify(JSON.parse(value), null, 2);
        } else {
          this.messages.push(`File could not be found, check if repo exists`);
          this.request = JSON.stringify({});
        }
        this.update_validity();
      } catch (error) {
        throw error;
      }
    },
    async do_request() {
      if (this.request === null) {
        return this.messages.push('Missing request');
      }

      this.sending_request = true;
      this.messages.push(`Sending request...`);

      try {
        (this.$refs.tab2 as HTMLInputElement).click();
        const start = Date.now();
        const value = await this.fn(this.row.function_name, JSON.parse(this.request));
        const end = Date.now();

        this.response = value;
        this.messages.push(`Results of running ${this.row.function_name}`);
        this.messages.push(`Runtime : ${(end - start) / 1000} seconds`);
      } catch (error) {
        throw error;
      }
    },
    save(type: 'request' | 'response') {
      let object: any;
      const timestamp = new Date().toISOString().slice(0, 10) + '-' +
        new Date().toLocaleTimeString().replace(/:/g, '-');

      if (type === 'request' && this.request) {
        object = this.request;
      } else if (type === 'response' && this.response) {
        object = this.response;
      } else {
        console.error(`Save command for ${type} failed`);
        return;
      }

      const filename = `${type}.${timestamp}.json`;
      download(object, filename);
    },
  },
});
</script>

<style lang="css" scoped>
.notify {
  color: red;
  margin-left: 10px;
}
.message {
  color: grey;
}
.message:last-child {
  color: inherit;
}
</style>