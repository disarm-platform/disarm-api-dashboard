
<template>
  <div>
    <div class="modal">
      <input id="modal_1" ref="modal" type="checkbox" />
      <label for="modal_1" class="overlay"></label>
      <article>
        <header>
          <h3>Loading</h3>
          <label for="modal_1" class="close">&times;</label>
        </header>
        <section class="content">{{ message }}</section>
        <footer>
          <a class="button" href="#">ok</a>
          <label for="modal_1" class="button dangerous">Cancel</label>
          <button disabled="is_show_closed" @click="close">Close</button>
        </footer>
      </article>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { EventBus } from '../event_bus';
import { FunctionActions } from '@/types';
export default Vue.extend({
  props: {
    message: String,
  },
  data() {
    return {
      is_show_close: false,
    };
  },
  mounted() {
    EventBus.$on(FunctionActions.loading_start, this.open);
    EventBus.$on(FunctionActions.loading_end, this.show_close);
  },
  destroyed() {
    EventBus.$off();
  },
  methods: {
    open() {
      (this.$refs.modal as any).checked = true;
    },
    show_close() {
      this.is_show_close = true;
    },
    close() {
      (this.$refs.modal as any).checked = false;
    },
  },
});
</script>
<style scoped>
@import "../../node_modules/picnic/picnic.min.css";
</style>