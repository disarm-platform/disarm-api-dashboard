<template>
  <div>
    <h3>{{ title }}</h3>
    <article class="card" v-if="deploy_params">
      <div v-if="!showResults">
        <textarea v-model="deploy_params" rows="20" placeholder="Textarea"></textarea>
        <footer v-if="working">
          <button class="dangerous" @click="goBack">Cancel</button>
          <button class="success" @click="deploy">Go!</button>
        </footer>
      </div>
      <div v-if="showResults">
        <div>{{ response }}</div>
        <button @click="$router.go(-1)">Go Back</button>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { OutgoingCombinedRecord } from '../types';
import { DeployParams, deploy } from '../deploy';
import { get_params } from '@/deploy';
import router from '../router';
export default Vue.extend({
  name: 'deploy',
  data() {
    return {
      deploy_params: null as null | string,
      response: '',
      working: true,
      title: '',
    };
  },
  props: {
    row: Object as () => OutgoingCombinedRecord,
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
  mounted() {
    this.title = `fetching params for ${this.row.function_name}`;
    try {
      get_params(this.row).then((value) => { this.deploy_params = JSON.stringify(value, undefined, 2); });
    } catch (error) {
      this.deploy_params = '';
    }
    this.title = `Confirm deploy ${this.row.function_name}`;
  },
  methods: {
    check_json_validity(json: any) {
      try {
        const obj = JSON.parse(json);
        if (obj && typeof obj === 'object' && obj !== null) {
          return true;
        }
      } catch (err) {
        throw err;
      }
      return false;
    },
    deploy() {
      this.working = false;
      if (!this.check_json_validity(this.deploy_params)) {
        return;
      }
      if (this.deploy_params) {
        deploy(JSON.parse(this.deploy_params)).then((value) => {
          console.log(value);
          this.response = value;
          this.title = 'Results';
          });
      } else {
        console.log('Cannot deploy with null params');
      }
    },
  },
});
</script>
<style scoped>
.button {
  margin: 0.5 0.5em;
}

.error {
  border-color: red;
}
</style>