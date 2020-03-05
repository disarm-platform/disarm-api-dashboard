<template>
  <div>
    <div v-for="(filemap, i) in filemaps" :key="i">
      <span class="tag">{{filemap.key}}</span>
    </div>
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