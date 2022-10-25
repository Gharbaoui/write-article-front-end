<template>
    <div class="flex">
        <router-link :to="{name : 'aboutme'}" >About me</router-link>
        
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ManagerCompo'
  });
  
  </script>
  