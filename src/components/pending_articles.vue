<template>
 <div class="grid grid-cols-1 min-w-full border rounded">
        <ul class="overflow-auto" style="height: 90vh;">
            <li v-for="art in articles" :key="art.id"
              class="w-full py-4 flex justify-between bg-red-300 mt-5 text-white text-2xl items-center"
            >
            <div>
              <img :src="art.logo" class="w-24" alt="">
            </div>
            <div class="flex">
              <div @click="articlePreview(art.id)" class="cursor-pointer flex justify-center items-center mt-5 mr-5 w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
                preview
              </div>
              <div @click="articleEdit(art.id)" class="cursor-pointer flex justify-center items-center mt-5 mr-5 w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
                edit
              </div>
            </div>
            <div>
              {{ art.title }}
            </div>  
            </li>
        </ul>
    </div>
  </template>
  
  <script lang="ts">
  import router from '@/router';
import axios from 'axios';
import { defineComponent } from 'vue';
  interface pendingArticle {
    logo: string;
    title:string;
    id:number;
  }
  export default defineComponent({
    name: 'PendingComp',
    data() {
      return {
        articles: [] as Array<pendingArticle>
      }
    },
    mounted() {
      this.getPendingArticles();
    },
    methods: {
      async getPendingArticles() {
        try {
          const resp = await axios({
                    method: 'patch',
                    url: `http://${process.env.VUE_APP_BACKEND_API}/articles/pendingarticles`,
                    data: {
                        password: process.env.VUE_APP_PASS,
                    }
          });
          this.articles = resp.data;
        } catch (err) {
          console.log(err);
        }
      },
      articlePreview(id:number) {
        router.push({name: 'articlepreview', query: {articleid: id}});
      },
      articleEdit(id:number) {
        router.push({name: 'articleexplained', query: {article_id: id}});
      }
    }
  });
  
  </script>
  