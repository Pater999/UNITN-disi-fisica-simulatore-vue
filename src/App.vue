<template>
  <div class="container-fluid">
    <Header v-if="$route.meta.showHeader" />

    <router-view />
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
