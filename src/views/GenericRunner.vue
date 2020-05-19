<template>
  <div>
    <h1>Generic function runner</h1>

    <button v-if="!example_box" @click="change_example_box" class="success">
    <button v-if="!example_box" @click="change_example_box" class="see_example__btn">
      See example
    </button>
    <button v-else-if="example_box" @click="change_example_box" class="error">
      Close example
    </button>

    <div v-if="example_box" class="example_box">
      <h3>Example</h3>

      <div>
        <div>
          <span>url:</span>
        </div>
        <div>
          <pre>https://faas.srv.disarm.io/function/fn-covariate-extractor</pre>
        </div>
      </div>
      <div>
        <span>params</span>
        <br />
        <div>
          <pre>
              {
              "layer_names": [
                "elev_m",
                "dist_to_water_m",
                "dist_to_road_m",
                "bioclim1"
              ],
              "points": {
                "type": "FeatureCollection",
                "features": [
                  {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        31.1737060546875,
                        -26.645003827815252
                      ]
                    }
                  }
                ]
              }
              }
          </pre>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="(message, i) in messages" :key="i" class="message">
        {{ message }}
      </li>
    </ul>
    <input
      type="text"
      placeholder="enter url here eg 'https://faas.srv.disarm.io/function/fn-covariate-extractor'"
      v-model="url"
    />
    <div class="tabs two">
      <input
        ref="request_tab"
        id="request_tab"
        type="radio"
        name="tabgroupB"
        checked
      />
      <label class="pseudo button toggle tabs" for="request_tab">Request</label>
      <input
        ref="response_tab"
        id="response_tab"
        type="radio"
        name="tabgroupB"
      />
      <label class="pseudo button toggle tabs" for="response_tab"
        >Response</label
      >

      <div class="row">
        <!-- REQUEST -->
        <div>
          <button @click="save()" :disabled="!request_string">
            Save request
          </button>
          <button
            class="success"
            :disabled="!valid_request || sending_request"
            @click="send_request"
          >
            Send
          </button>
          <hr />
          <div v-if="!sending_request">
            <span class="notify" v-if="!valid_request && request_string"
              >Input is not valid JSON</span
            >
            <div class="flex four">
              <div class="three-fourth">
                <div v-if="show_string">
                  <textarea
                    v-model.lazy="request_string"
                    rows="20"
                    :disabled="sending_request"
                    class="request"
                  ></textarea>
                  <button @click="show_string = false" class="pseudo">
                    Hide request
                  </button>
                  <button @click="format" class="pseudo">
                    ~ Format request
                  </button>
                </div>
                <div v-else>
                  <button @click="show_string = true" class="pseudo">
                    Show request
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <pre>{{ formatted_request() }}</pre>
          </div>
        </div>

        <!-- RESPONSE -->
        <Response
          :response="response"
          :sending_request="sending_request"
          @post_message="post_message"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Response from '@/components/Response.vue';
import Request from '@/components/Response.vue';
import ManageFiles from '@/components/Response.vue';
import { generic_runner } from '@/controllers/test.ts';
import { save_requester } from '@/lib/save_requester';
import { isUndefined, cloneDeep } from 'lodash';
import { AnyJson, JsonMap, FileMap } from '@/types';

export default Vue.extend({
  components: { Response, Request, ManageFiles },
  name: 'GenericRunner',
  data() {
    return {
      sending_request: false,
      response: null as null | string,
      messages: [] as string[],
      row: {},
      request_string: '{}' as string,
      show_string: true,
      url: null as null | string,
      example_box: true,
    };
  },
  methods: {
    change_example_box() {
      this.example_box = !this.example_box;
    },
    add_filemap(filemap: FileMap) {
      const stringed = JSON.stringify({ [filemap.key]: filemap.data });
      const parsed = cloneDeep(this.parsed_request());
      (parsed as JsonMap)[filemap.key] = filemap.data;
      this.request_string = JSON.stringify(parsed, null, 2);
    },

    keys(): string[] {
      if (
        typeof this.parsed_request === 'object' &&
        this.parsed_request !== null
      ) {
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
        return JSON.stringify(this.parsed_request(), null, 2);
      } catch {
        return this.request_string;
      }
    },
    format() {
      const new_requst = this.formatted_request;
      this.request_string = this.formatted_request();
    },
    isUrl(url: string) {
      const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(url);
    },
    async send_request() {
      if (this.url === null) {
        this.post_message('Missing request url');
        return this.$emit('post_message', 'Missing request url');
      }

      if (!this.isUrl(this.url)) {
        this.post_message('Invalid url');
        return this.$emit('post_message', 'Invalid url');
      }

      if (this.request_string === null) {
        this.post_message('Missing request');
        return this.$emit('post_message', 'Missing request');
      }

      this.sending_request = true;

      this.update_sending_request(this.sending_request);

      this.$emit('post_message', `Sending request...`);
      this.post_message(`Sending request...`);
      try {
        this.$emit('sending_request', this.sending_request);
        const start = Date.now();
        const value = await generic_runner(
          this.url || '',
          this.parsed_request(),
        );
        const end = Date.now();

        this.set_response(value);
        this.$emit('response', value || 'Finished, no response body sent');

        this.$emit(
          'post_message',
          `Results of running ${this.url} (${(end - start) / 1000} seconds)`,
        );
        this.post_message(
          `Results of running ${this.url} (${(end - start) / 1000} seconds)`,
        );
        this.$emit('refresh_list');
      } catch (error) {
        throw error;
      }
    },
    parsed_request(): undefined | AnyJson {
      try {
        return JSON.parse(this.request_string);
      } catch (e) {
        return undefined;
      }
    },
    remove_key(key: string) {
      const parsed = cloneDeep(this.parsed_request());
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

    valid_request(): boolean {
      return !isUndefined(this.parsed_request());
    },
    save() {
      save_requester(this.request_string, 'request');
    },
    post_message(message: string) {
      this.messages.push(message);
    },
    update_sending_request(sending_request: boolean) {
      this.sending_request = sending_request;
      if (this.sending_request === true) {
        setTimeout(() => {
          (this.$refs.response_tab as HTMLInputElement).click();
        }, 800);
      }
    },
    set_response(response: string) {
      this.response = response;
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

  border-radius: 2px;
  padding: 3px;

  cursor: pointer;
}
.tag:hover {
  background: #ff4a4a;
}

.message {
  color: grey;
}
.message:last-child {
  color: inherit;
}

label.tabs {
  width: 50%;
}

.example_box {
  border: solid 0.2px;
  padding: 20px;
  border-color: #e0dada;
}
.see_example__btn{
  background:white;
  color:black;
  border: 1px solid;
  border-color: gray;
}
</style>
