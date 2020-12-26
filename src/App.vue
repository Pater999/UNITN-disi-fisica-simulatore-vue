<template>
  <div class="container-fluid">
    <Header />

    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './components/Header/Header.vue';
export default Vue.extend({
  components: { Header },
});
</script>
