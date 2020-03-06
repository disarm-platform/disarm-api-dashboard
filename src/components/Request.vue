<template>
  <div>
    <button class="pseudo" @click="$router.go(-1)">Back to list</button>
    <button @click="save()" :disabled="!request">Save request</button>
    <button class="success" :disabled="!request_valid || sending_request" @click="do_request">Send</button>

    <div v-if="!sending_request">
      <span class="notify" v-if="!request_valid && request">Input is not valid JSON</span>

      <hr />
      <h5>Files</h5>
      <ManageFiles @add_placeholders="add_placeholders" />

      <hr />

      <!-- Manage keys -->
      <h5>Keys</h5>

      <div v-for="key in keys" :key="key">
        <span
          data-tooltip="click to remove from JSON"
          class="tag"
          @click="remove_key(key)"
        >{{key}} x</span>
      </div>

      <hr />

      <textarea v-model="request" rows="20" @input="update_validity" :disabled="sending_request"></textarea>
    </div>

    <div v-else>
      <pre>{{formatted_request}}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ManageFiles from '@/components/ManageFiles.vue';
import { save_requester } from '@/lib/save_requester';
import { OutgoingCombinedRecord, FileMap } from '@/types';

export default Vue.extend({
  components: { ManageFiles },
  props: {
    row: Object as () => OutgoingCombinedRecord,
    fn: Function,
    get_sample: Function,
  },
  data() {
    return {
      request: null as null | string,
      request_valid: false,
      sending_request: false,
    };
  },
  computed: {
    keys(): string[] {
      if (this.request === null) {
        return [];
      }
      try {
        return Object.keys(JSON.parse(this.request));
      } catch {
        return [];
      }
    },
    formatted_request(): string {
      if (this.request === null) {
        return '';
      }
      try {
        return JSON.stringify(JSON.parse(this.request), null, 2);
      } catch {
        return this.request;
      }
    },
  },
  mounted() {
    this.try_get_sample();
  },
  methods: {
    save() {
      save_requester(this.request, 'request');
    },
    update_validity() {
      this.request_valid = this.check_json_validity(this.request);
    },
    check_json_validity(json: any): boolean {
      if (typeof json === 'object') {
        return true; // Already parsed as an object
      }
      try {
        const obj = JSON.parse(json);
        return (obj && typeof obj === 'object' && obj !== null);
      } catch (err) {
        return false;
      }
    },
    async try_get_sample() {
      this.$emit('post_message', `Fetching test_req file for ${this.row.function_name}`);
      try {
        const value = await this.get_sample(this.row);

        if (this.check_json_validity(value)) {
          this.$emit('post_message', `Retrieved test_req file from repo`);
          this.request = JSON.stringify(JSON.parse(value), null, 2);
        } else {
          this.$emit('post_message', `File could not be found, check if repo exists`);
          this.request = JSON.stringify({});
        }
        this.update_validity();
      } catch (error) {
        throw error;
      }
    },
    async do_request() {
      if (this.request === null) {
        return this.$emit('post_message', 'Missing request');
      }

      this.sending_request = true;
      this.$emit('post_message', `Sending request...`);

      try {
        this.$emit('sending_request', this.sending_request);
        const start = Date.now();
        const value = await this.fn(this.row.function_name, JSON.parse(this.request));
        const end = Date.now();

        this.$emit('response', value || 'Finished, no response body sent');
        this.$emit('post_message', `Results of running ${this.row.function_name}`);
        this.$emit('post_message', `Runtime : ${(end - start) / 1000} seconds`);
        this.$emit('refresh_list');
      } catch (error) {
        throw error;
      }
    },

    add_placeholders(filemaps: FileMap[]) {
      if (this.request === null) {
        console.warn('Setting filemaps before request exists');
        return;
      }
      const request_json = JSON.parse(this.request);
      const keys = filemaps.forEach((fm) => {
        request_json[fm.key] = fm.data;
      });
      this.request = JSON.stringify(request_json, null, 2);
    },
    remove_key(key: string) {
      if (this.request === null) {
        console.warn('trying to remove key from null request');
        return;
      }
      try {
        const parsed = JSON.parse(this.request);
        delete parsed[key];
        this.request = JSON.stringify(parsed, null, 2);
      } catch (e) {
        console.warn('Failed to remove key', key);
      }
    },
  },
});
</script>

<style scoped>
.notify {
  color: red;
  margin-left: 10px;
}

.tag {
  background: #ff9800;
  font-size: 0.95em;
  border-radius: 2px;
  padding: 3px;
  color: white;
  cursor: pointer;
}
.tag:hover {
  background: #bd8127;
}
</style>