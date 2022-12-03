<template>
    <div class="flex justify-around py-5 h-full">
      <div class=" w-1/4 h-full flex flex-col justify-around">
        <div>
          <!-- title -->
          <span class="block text-center text-xl text-white">Title</span>
          <textarea v-model="title_text" rows="4" class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="your title..."></textarea>
        </div>
        <div>
          <!-- idea -->
          <span class="block text-center text-xl text-white">Idea</span>
          <textarea v-model="idea_text" rows="4" class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="your idea..."></textarea>
        </div>
        <div>
          <span class="block text-white text-xl">Article Logo</span>
          <input class="block w-full" @change="ArticleLogoImg" type="file">
        </div>
      </div>
      <div class="w-1/4 flex flex-col items-center justify-around">
        <div>
          <span class="block text-center text-white text-xl">Article Id</span>
          <input type="text" v-model="article_id">
        </div>
        <div>
          <span class="block text-center text-white text-xl">Error message</span>
          <textarea v-model="error_text" rows="4" class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
      </div>
      <div class="w-1/4 flex flex-col items-center">
        <div class="h-5/6 flex flex-col justify-around">
          <!-- check boxes -->
          <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="empty_article"><span class="ml-2 text-white text-lg">initial</span>
          </label>
          <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="title_update"><span class="ml-2 text-white text-lg">title</span>
          </label>
          <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="idea_update"><span class="ml-2 text-white text-lg">idea</span>
          </label>
          <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="logo_update"><span class="ml-2 text-white text-lg">logo</span>
          </label>
        </div>
        <div class="h-1/6">
          <!-- buttosn -->
          <div @click="updateBasicArticle" class="flex justify-center items-center mt-5 mr-5 w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
              done
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';

  export default defineComponent({
    name: 'ArticleBasicCompo',
    data() {
      return {
        title_text: '',
        idea_text: '',
        article_logo: null as any,
        article_id: -1 as number,
        error_text: '',
        empty_article: false as boolean,
        title_update: false as boolean,
        idea_update: false,
        logo_update: false,
      }
    },
    methods: {
      async ArticleLogoImg(event:any)
      {
          try {
            
            if (event.target.files.length > 0)
              this.article_logo = await toBase64 (event.target.files[0]);
          }catch (e:any)
          {
              console.error(e);
          }
      },
      async updateBasicArticle() {
        if (this.empty_article) {
          await this.createEmptyArticle();
        } else {
          if (this.title_update) {
            await this.titleUpdate()
          }
          if (this.idea_update) {
            await this.ideaUpdate();
          }
          if (this.logo_update) {
            await this.logoUpdate();
          }
        }
      },
      async createEmptyArticle() {
        try {
          const resp = await axios({
                  method: 'post',
                  url: `http://${process.env.VUE_APP_BACKEND_API}/articles/createempty`,
                  data: {
                    password: process.env.VUE_APP_PASS
                  }
          });
          if (resp.data.failed) {
            this.error_text = resp.data.msg;
          } else {
            this.article_id = resp.data;
            this.error_text = ``;
          }
        } catch(e) {
          console.log(e);
        }
      },
      async titleUpdate() {
        try {
          const resp = await axios({
                  method: 'patch',
                  url: `http://${process.env.VUE_APP_BACKEND_API}/articles/titleupdate`,
                  data: {
                    password: process.env.VUE_APP_PASS,
                    id: this.article_id,
                    add: false,
                    title: this.title_text,
                  }
          });
          if (resp.data.failed) {
            this.error_text = resp.data.msg;
          } else {
            this.error_text = ``;
          }
        } catch(e) {
          console.log(e);
        }
      },
      async ideaUpdate() {
        try {
          const resp = await axios({
                  method: 'patch',
                  url: `http://${process.env.VUE_APP_BACKEND_API}/articles/ideaupdate`,
                  data: {
                    password: process.env.VUE_APP_PASS,
                    id: this.article_id,
                    add: false,
                    idea: this.idea_text,
                  }
          });
          if (resp.data.failed) {
            this.error_text = resp.data.msg;
          } else {
            this.error_text = ``;
          }
        } catch(e) {
          console.log(e);
        }
      },
      async logoUpdate() {
        try {
          const resp = await axios({
                  method: 'patch',
                  url: `http://${process.env.VUE_APP_BACKEND_API}/articles/logoupdate`,
                  data: {
                    password: process.env.VUE_APP_PASS,
                    id: this.article_id,
                    logo: this.article_logo  
                  }
          });
          if (resp.data.failed) {
            this.error_text = resp.data.msg;
          } else {
            this.error_text = ``;
          }
        } catch(e) {
          console.log(e);
        }
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
  