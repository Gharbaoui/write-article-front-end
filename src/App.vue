<template>
  <div class="bg-blue-300">
    <nav  class="flex invisible lg:visible z-30 bg-gradient-to-r from-indigo-500 via-purple-300 to-blue-500  py-5 px-5 rounded-lg">
      <div class="mr-5 w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
        <router-link :to="{name: 'user'}">user</router-link>
      </div>
    </nav>
    <router-view />
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppCompo',
  components:{
  }
});

</script>
