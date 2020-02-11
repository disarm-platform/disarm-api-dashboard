<template>
  <div class="sbl-circ"></div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'spinner',
});
</script>
<style scoped>
.sbl-circ {
  height: 1.25em;
  width: 1.25em;
  color: #245AC4;
  position: relative;
  display: inline-block;
  border: 0.2em solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 1s linear infinite; }

@keyframes rotate {
  0% {
    transform: rotate(0); }
  100% {
    transform: rotate(360deg); } }
</style>