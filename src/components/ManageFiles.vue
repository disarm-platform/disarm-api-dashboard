<template>
  <div>
    <LoadFile v-if="show_add" @map_file="map_file" />
    <button @click="show_add = true" v-if="!show_add">Add</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import LoadFile from '@/components/LoadFile.vue';
import { FileMap } from '@/types';

export default Vue.extend({
  components: { LoadFile },
  data() {
    return {
      filemaps: [] as FileMap[],
      show_add: true,
    };
  },
  methods: {
    map_file(filemap: FileMap) {
      this.filemaps.push(filemap);
      this.$emit('add_placeholders', this.filemaps);
      this.show_add = false;
    },
  },
});
</script>

<style scoped>
</style>