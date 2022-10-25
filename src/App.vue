<template>
  <div class="bg-gradient-to-b from-blue-700 to-transparent h-screen">
    <manager-comp />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ManagerComp from './components/manager.vue';

export default defineComponent({
  name: 'AppCompo',
  components:{
    'manager-comp': ManagerComp
  }
});

</script>
