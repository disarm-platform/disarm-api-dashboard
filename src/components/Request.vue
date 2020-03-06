<template>
  <div>
    <button @click="save()" :disabled="!request_string">Save request</button>
    <button class="success" :disabled="!valid_request || sending_request" @click="send_request">Send</button>
    <hr />
    <div v-if="!sending_request">
      <span class="notify" v-if="!valid_request && request_string">Input is not valid JSON</span>
      <div class="flex four">
        <div class="fourth">
          <div>
            <strong>Keys</strong>
          </div>
          <div>
            <em v-if="!keys.length">No keys</em>
          </div>
          <ul class="tags">
            <li
              v-for="key in keys"
              :key="key"
              class="tag"
              data-tooltip="click to remove from JSON"
              @click="remove_key(key)"
            >{{key}}</li>
          </ul>

          <ManageFiles @add_filemap="add_filemap" />
        </div>

        <div class="three-fourth">
          <div v-if="show_string">
            <textarea
              v-model.lazy="request_string"
              rows="20"
              :disabled="sending_request"
              class="request"
            ></textarea>
            <button @click="show_string = false" class="pseudo">Hide preview</button>
            <button @click="format" class="pseudo">~ Format preview</button>
          </div>
          <div v-else>
            <button @click="show_string = true" class="pseudo">Show preview</button>
          </div>
        </div>
      </div>
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
      show_string: false,
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
      if (this.request_string === null) {
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
    format() {
      const new_requst = this.formatted_request;
      this.request_string = this.formatted_request;
    },
    async try_get_sample() {
      this.$emit('post_message', `Fetching test_req file for ${this.row.function_name}`);

      try {
        const sample = await this.get_sample(this.row);
        if (!isUndefined(sample)) {
          this.request_string = sample;
          this.request_string = this.formatted_request;
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
    add_filemap(filemap: FileMap) {
      const stringed = JSON.stringify({ [filemap.key]: filemap.data });
      const parsed = cloneDeep(this.parsed_request);
      (parsed as JsonMap)[filemap.key] = filemap.data;
      this.request_string = JSON.stringify(parsed, null, 2);
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
.request {
  font-family: monospace;
}
.notify {
  color: red;
  margin-left: 10px;
}
.tags {
  margin: 0px;
}
.tag {
  margin: 4px;
  font-family: monospace;
  /* font-size: 0.95em; */
  border-radius: 2px;
  padding: 3px;
  /* color: white; */
  cursor: pointer;
}
.tag:hover {
  background: #ff4a4a;
  /* background: #ff9800; */
  /* background: #bd8127; */
}
</style>