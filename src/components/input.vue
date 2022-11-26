<template>
    <div class="flex">
      <span>{{input_title}}: </span>
      <input type="text" v-model="inp" @keypress="sendUp"  >
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'InputCompo',
    props: {
      input_title: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        inp: ''
      }
    },
    methods: {
      sendUp()
      {
        console.log(`emitted`);
        this.$emit('inputChanged', this.inp);
      }
    }
  });
  
  </script>
  