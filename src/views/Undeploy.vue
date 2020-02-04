<template>
  <div>
    <article class="card">
      <div v-if="!showResults">
        <h3>Are you sure you want to undeploy function {{ row.function_name }}?</h3>
        <footer>
          <button class="dangerous" @click="goBack">Cancel</button>
          <button class="success" @click="undeploy">Go!</button>
        </footer>
      </div>
      <div v-if="showResults">
        <h3>Results</h3>
        <div>{{ response }}</div>
        <button @click="goBack">Go Back</button>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { OutgoingCombinedRecord } from '@/types';
import router from '@/router';
import { undeploy } from '@/undeploy';
export default Vue.extend({
  props: {
    row: Object as () => OutgoingCombinedRecord,
  },
  data() {
    return {
      response: '',
    };
  },
  computed: {
    showResults() {
      if (!this.response || this.response === '') {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    undeploy() {
      console.log(`undeploying ${this.row.function_name}`);
      undeploy(this.row.function_name).then((value) => this.response = value);
    },
  },
});
</script>