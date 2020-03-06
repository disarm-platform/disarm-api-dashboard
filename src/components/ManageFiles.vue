<template>
  <div>
    <LoadFile v-if="show_add" @map_file="map_file" />
    <button @click="show_add = true" v-if="!show_add" class="pseudo">+ Add from file</button>
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
      show_add: false,
    };
  },
  methods: {
    map_file(filemap: FileMap) {
      this.$emit('add_filemap', filemap);
      this.show_add = false;
    },
  },
});
</script>

<style scoped>
</style>