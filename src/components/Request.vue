<template>
  <div>
    <button @click="save()" :disabled="!request_string">Save request</button>
    <button class="success" :disabled="!valid_request || sending_request" @click="send_request">Send</button>

    <div v-if="!sending_request">
      <span class="notify" v-if="!valid_request && request_string">Input is not valid JSON</span>

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

      <textarea v-model.lazy="request_string" rows="20" :disabled="sending_request"></textarea>
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
import { OutgoingCombinedRecord, FileMap, AnyJson, JsonMap } from '@/types';
import { isUndefined, cloneDeep } from 'lodash';

export default Vue.extend({
  components: { ManageFiles },
  props: {
    row: Object as () => OutgoingCombinedRecord,
    fn: Function,
    get_sample: Function,
  },
  data() {
    return {
      request_string: '{}' as string,
      sending_request: false,
    };
  },
  computed: {
    parsed_request(): undefined | AnyJson {
      try {
        return JSON.parse(this.request_string);
      } catch (e) {
        return undefined;
      }
    },
    valid_request(): boolean {
      return !isUndefined(this.parsed_request);
    },
    keys(): string[] {
      if (typeof this.parsed_request === 'object' && this.parsed_request !== null) {
        return Object.keys(this.parsed_request);
      }
      return [];
    },
    formatted_request(): string {
      if (this.request_string === null || !this.sending_request) {
        return '';
      }
      try {
        console.log('stringify');
        return JSON.stringify(this.parsed_request, null, 2);
      } catch {
        return this.request_string;
      }
    },
  },
  mounted() {
    this.try_get_sample();
  },
  methods: {
    save() {
      save_requester(this.request_string, 'request');
    },
    async try_get_sample() {
      this.$emit('post_message', `Fetching test_req file for ${this.row.function_name}`);

      try {
        const sample = await this.get_sample(this.row);
        if (!isUndefined(sample)) {
          this.request_string = sample;
          this.$emit('post_message', `Retrieved test_req file from repo`);
        } else {
          this.$emit('post_message', `File could not be found, check if repo exists`);
          this.request_string = '{}';
        }
      } catch (error) {
        this.$emit('post_message', `Error retrieving file`);
        throw error;
      }
    },
    async send_request() {
      if (this.request_string === null) {
        return this.$emit('post_message', 'Missing request');
      }

      this.sending_request = true;
      this.$emit('post_message', `Sending request...`);

      try {
        this.$emit('sending_request', this.sending_request);
        const start = Date.now();
        const value = await this.fn(this.row, this.parsed_request);
        const end = Date.now();

        this.$emit('response', value || 'Finished, no response body sent');
        this.$emit('post_message', `Results of running ${this.row.function_name} (${(end - start) / 1000} seconds)`);
        this.$emit('refresh_list');
      } catch (error) {
        throw error;
      }
    },

    add_placeholders(filemaps: FileMap[]) {
      // if (this.request_string === null) {
      //   console.warn('Setting filemaps before request exists');
      //   return;
      // }
      // const request_json = this.parsed_request;
      // const keys = filemaps.forEach((fm) => {
      //   request_json[fm.key] = fm.data;
      // });
      // console.log('stringify');
      // this.request_string = JSON.stringify(request_json, null, 2);
    },
    remove_key(key: string) {
      const parsed = cloneDeep(this.parsed_request);
      if (parsed === null || typeof parsed === 'undefined') {
        console.warn('Trying to remove key from empty/undefined request');
        return;
      }

      try {
        delete (parsed as JsonMap)[key];
        console.log('stringify');
        this.request_string = JSON.stringify(parsed, null, 2);
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