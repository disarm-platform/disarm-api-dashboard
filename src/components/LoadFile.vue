<template>
  <div>
    <label>
      <input type="file" @change="file_from_input" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { load_data } from '@/lib/load_file';

export default Vue.extend({
  methods: {
    async file_from_input(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        console.warn('No file found to load');
        return;
      }

      const { data, message } = await load_data(file);
      if (data) {
        console.log('loaded data:', data);
      } else {
        console.log('problem:', message);
      }
    },
  },
});
</script>

<style scoped>
</style>