<template>
  <edit-comp />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditComp from './components/edit.vue';

export default defineComponent({
  name: 'AppCompo',
  components:{
    'edit-comp': EditComp
  }
});

</script>
