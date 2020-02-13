<template>
  <div id="app">
    <div class="flex two nav">
      <div>
        <span style="font-weight: 900;">DiSARM Dashboard</span>
      </div>
      <div class="half" style="text-align: right;">
        <router-link to="logout">Logout</router-link>
      </div>
    </div>

    <keep-alive include="list">
      <router-view class="content" />
    </keep-alive>
  </div>
</template>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8em;
  max-width: 960px;
  margin: 0 auto;
}
.nav {
  background: #f1f1f1;
  height: 35px;
  padding: 8px;
}
.content {
  padding-top: 10px;
}
</style>
