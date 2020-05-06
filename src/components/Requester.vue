<template>
  <div>
    <ul>
      <li v-for="(message, i) in messages" :key="i" class="message">{{message}}</li>
    </ul>
    <button class="pseudo" @click="$router.go(-1)">  Back to list</button>

    <div class="tabs two">
      <input ref="request_tab" id="request_tab" type="radio" name="tabgroupB" checked />
      <label class="pseudo button toggle" for="request_tab">Request</label>
      <input ref="response_tab" id="response_tab" type="radio" name="tabgroupB" />
      <label class="pseudo button toggle" for="response_tab">Response</label>

      <div class="row">
        <!-- REQUEST -->
        <Request
          :row="row"
          :fn="fn"
          :get_sample="get_sample"
          @post_message="post_message"
          @sending_request="update_sending_request"
          @response="set_response"
        />

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
import download from 'downloadjs';

import Request from '@/components/Request.vue';
import Response from '@/components/Response.vue';
import { OutgoingCombinedRecord, FileMap } from '@/types';

export default Vue.extend({
  components: { Request, Response },
  props: {
    row: Object as () => OutgoingCombinedRecord,
    fn: Function,
    get_sample: Function,
  },
  data() {
    return {
      sending_request: false,
      response: null as null | string,
      messages: [] as string[],
    };
  },
  methods: {
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

<style lang="css" scoped>
.message {
  color: grey;
}
.message:last-child {
  color: inherit;
}
</style>