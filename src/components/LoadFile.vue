<template>
  <div>
    <div v-if="errors">{{errors}}</div>
    <fieldset class="flex two" v-else>
      <label>
        <input type="text" v-model="key" placeholder="Enter key" />
      </label>
      <label>
        <input type="file" @change="file_from_input" />
      </label>
      <button class="success" @click="save" :disabled="!key || !data">Save</button>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { load_data } from '@/lib/load_file';
import { FileMap } from '@/types';

export default Vue.extend({
  data() {
    return {
      errors: null as null | string,
      key: null as null | string,
      data: null as null | any,
    };
  },
  methods: {
    async file_from_input(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        console.warn('No file found to load');
        return;
      }

      const { data, message } = await load_data(file);
      if (data) {
        this.data = data;
      } else if (message) {
        this.errors = message;
      } else {
        throw new Error('Totally broken response from load_data');
      }
    },
    save() {
      if (!this.key || !this.data) {
        return;
      }
      const filemap: FileMap = {
        key: this.key,
        data: this.data,
      };
      this.$emit('map_file', filemap);
    },
  },
});
</script>

<style scoped>
</style>