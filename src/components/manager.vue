<template>
  <nav  class="flex z-30 bg-gradient-to-r from-indigo-500 via-purple-300 to-blue-500  py-5 px-5 rounded-lg">
    <div class="mr-5 w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
      <router-link :to="{name: 'articles'}">Articles</router-link>
    </div>
    <div class="border-solid w-24 text-center border-2 border-sky-500 py-3 rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
      <router-link :to="{name: 'aboutme'}">Aboutme</router-link>
    </div>
  </nav>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ManagerCompo'
});

</script>
  