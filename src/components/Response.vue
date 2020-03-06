<template>
  <div>
    <button @click="save()" :disabled="!response">Save response</button>

    <div v-if="response">
      <pre>{{formatted_response}}</pre>
    </div>
    <div v-else-if="!sending_request">Waiting for request to be sent.</div>
    <div v-else>Waiting for request to complete...</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { save_requester } from '@/lib/save_requester';

export default Vue.extend({
  props: {
    sending_request: Boolean,
    response: String as () => null | string,
  },
  computed: {
    formatted_response(): string {
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
  methods: {
    save() {
      save_requester(this.response, 'response');
    },
  },
});
</script>

<style scoped>
</style>