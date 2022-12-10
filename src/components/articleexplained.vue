<template>
    <div class="w-full h-full flex flex-col">
      <div class="flex justify-around h-1/5 items-center w-full bg-red-300">
        <div>
          <span class="block text-white text-xl">Article id: </span>
          <input type="text" v-model="article_id">
        </div>
        <div>
          <span class="block text-white text-xl"> conclusion: </span>
          <textarea cols="70" rows="5" v-model="conculsion"></textarea>
        </div>
        <div>
          <span class="block text-white text-xl"> response: </span>
          <textarea name="" id="" cols="30" rows="5" :class="{'bg-red-300 rotate-12': failure}" v-model="response"></textarea>
        </div>
      </div>
      <div class="flex h-3/5 justify-between">
        <div class="w-1/2 flex flex-col h-full">
          <div>
            <span class="block text-white text-xl text-center"> explaine text: </span>
            <textarea cols="100" rows="5" v-model="explaine_txt"></textarea>
          </div>
          <div class="h-1/2">
            <span class="block text-white text-xl text-center"> explaine image: </span>
            <div  class="h-full justify-around flex flex-col items-center">
              <div>
                <span class="text-white text-xl"> path url: </span>
                <input type="text" v-model="explaine_img.path">
              </div>
              <div>
                <span class="text-white text-xl"> path local: </span>
                <input type="file" @change="loadImage">
              </div>
              <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="explaine_img.is_local"><span class="ml-2 text-white text-lg">is local</span>
              </label>
            </div>
          </div>
        </div>
        <div class="w-1/2 h-full flex flex-col justify-between">
          <div class="h-5/6">
            <span class="block text-white text-xl text-center"> source code: </span>
            <textarea cols="100" class="h-full" rows="10" v-model="code_snipest.source_code"></textarea>
          </div>
          <div>
            <span class="text-white text-xl">language: </span>
            <input type="text" v-model="code_snipest.language">
          </div>
        </div>
      </div>
      <div class="w-full bg-red-400 h-1/5 flex justify-between items-center">
        <div>
          <span class="text-white text-xl">index: </span>
          <input type="text" v-model="explained_index">
        </div>
        <div @click="addExplained"  class="cursor-pointer flex justify-center items-center mt-5 mr-5 h-8 w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
          add
        </div>
        <div @click="removeExplained" class="cursor-pointer flex justify-center items-center mt-5 mr-5 h-8  w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
          remove
        </div>
        <div  @click="updateExplained"  class="cursor-pointer flex justify-center items-center mt-5 mr-5 h-8  w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
          update
        </div>
        <div class="cursor-pointer flex justify-center items-center mt-5 mr-5 h-8  w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
          text
        </div>
        <div class="cursor-pointer flex justify-center items-center mt-5 mr-5 h-8  w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
          conclusion
        </div>
        <div class="cursor-pointer flex justify-center items-center mt-5 mr-5 h-8  w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
          image
        </div>
        <div class="cursor-pointer flex justify-center items-center mt-5 mr-5 h-8  w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
          code
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ArticleExplainedComp',
    data() {
      return {
        article_id: this.$route.query.article_id,
        conculsion: '',
        response: '',
        failure: false,
        explaine_txt: '',
        explaine_img: {
          path: null as any,
          is_local: false,
        },
        code_snipest: {
          source_code: '',
          language: '' 
        },
        explained_index: -1
      }
    },
    methods: {
      async loadImage(event:any) {
        try {
            
            if (event.target.files.length > 0)
              this.explaine_img.path = await toBase64 (event.target.files[0]);
          }catch (e:any)
          {
              console.error(e);
          }
      },
      async addExplained() {
        try {
          const resp = await axios({
            method: `patch`,
            url: `http://${process.env.VUE_APP_BACKEND_API}/articles/explainedadd`,
            data: {
              password: process.env.VUE_APP_PASS,
              id: this.article_id,
              explain_txt: this.explaine_txt,
              explain_img: this.explaine_img,
              code_snipest: this.code_snipest
            }
          });
          this.backendresponse(resp, "added success");
        } catch(e) {
          console.log(e);
        }
      },
      async updateExplained() {
        try {
          const resp = await axios({
            method: `patch`,
            url: `http://${process.env.VUE_APP_BACKEND_API}/articles/explainedupdate`,
            data: {
              password: process.env.VUE_APP_PASS,
              id: this.article_id,
              index: this.explained_index,
              explain_txt: this.explaine_txt,
              explain_img: this.explaine_img,
              code_snipest: this.code_snipest
            }
          });
          this.backendresponse(resp, "update success");
        } catch(e) {
          console.log(e);
        }
      },
      async removeExplained () {
        try {
          const resp = await axios({
            method: `patch`,
            url: `http://${process.env.VUE_APP_BACKEND_API}/articles/explainedremove`,
            data: {
              password: process.env.VUE_APP_PASS,
              id: this.article_id,
              index: this.explained_index,
            }
          });
          this.backendresponse(resp, "remove success");
        } catch(e) {
          console.log(e);
        }
      },
      backendresponse(resp:any, msg:string) {
        if (resp.data.failed) {
                this.failure = true;
                this.response = resp.data.msg;
            } else {
                this.response = msg;
        }
      },
    },
    watch: {
    failure() {
      setTimeout(() => {
          this.failure = false;
      }, 1000);
    }
    }
  });
  const toBase64 =(file:any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
  </script>
  