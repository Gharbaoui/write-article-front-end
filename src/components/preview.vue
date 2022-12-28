<template>
  <div class="h-full w-full flex flex-col justify-center items-center py-5">
    <div class="h-full overflow-y-auto w-full  px-5 w-5/6">
      <div class="text-center w-full text-lg text-white py-3 font-mono font-bold border-line border-white border-b-2">
        {{explained.title}}
      </div>
      <div class="mt-5 text-center w-full text-lg py-3 text-white font-mono font-bold border-line border-white border-b-2">
        {{explained.idea}}
      </div>
      <div v-if="is_there_requirements" class="border-line border-white border-b-2 py-3">
        <div class="w-full text-2xl text-center font-bold">
          Requirements
        </div>
        <div v-for="(req, index) in explained.preqs" :key="index" class="w-full">
          <div v-if="req.is_local_article" @click="redirectToArticle(+req.req_url)" class="text-white font-mono text-xl cursor-pointer">
              {{req.req_title}}
          </div>
          <div v-else class="text-white font-mono text-xl cursor-pointer">
            <a :href="req.req_url" target="_blank">{{req.req_title}}</a>
          </div>
        </div>
      </div>

      <div v-for="(exp, index) in explained.explained" :key="index" class="w-full flex flex-col items-center border-line border-white border-b-2 py-3">
        <div class="text-white text-lg font-serif font-bold mb-3">
          {{exp.explain_txt}}
        </div>
        <div class="mb-4">
          <img :src="exp.explain_img.path" alt="explained image for more learning">
        </div>
        <div class="w-full">
          <pre v-if="is_source_code(index)" v-codehighlighting data-prismjs-copy-timeout="500" class="w-full"><code :class="exp.code_snipest.language" data-prismjs-copy="copy">{{exp.code_snipest.source_code}}</code></pre>
        </div>
        <div>
        </div>
      </div>

      <div class="w-full text-center mt-4 text-white text-2xl font-mono">
        <!-- conclusion  -->
        {{explained.conclusion}}
      </div>

      </div>
      <div v-if="next_exist && prev_exist" class="flex justify-between w-full">
        <div @click="prevArticle" class="cursor-pointer bg-white border border-gray-300 text-gray-500 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
          Previous
        </div>
        <div @click="nextArticle" class="bg-white border border-gray-300 text-gray-500 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
        </div>
      </div>
      <div v-else class="w-full">
        <div v-if="next_exist" class="w-full flex justify-end"> 
          <div @click="nextArticle" class="bg-white border border-gray-300 text-gray-500 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </div>
        </div>
        <div v-if="prev_exist" class="w-full flex justify-begin">
          <div @click="prevArticle" class="cursor-pointer bg-white border border-gray-300 text-gray-500 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
            Previous
          </div>
        </div>
      </div>
    </div>
</template>
    
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  import {explained} from './dto/article';
  import Prism from 'prismjs';
  import "prismjs/themes/prism-tomorrow.css"
  import "prismjs/plugins/toolbar/prism-toolbar.min.css";
  import "prismjs/plugins/toolbar/prism-toolbar.min";
  import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
  // import store from '@/store';
  import router from '@/router';

  export default defineComponent({
    name: 'ArticleBlock',
    mounted() {
      // store.commit('update_is_article', true);
      this.getExplained();
    },
    unmounted () {
      // store.commit('update_is_article', false);
    },
    data() {
        return {
            explained: {} as explained,
            article_id: Number(this.$route.query.articleid),
            response: '',
        }
    },
    methods: {
      async getExplained() {
        try {
          const resp = await axios({
            method: `patch`,
            url: `http://${process.env.VUE_APP_BACKEND_API}/articles/articleat`,
            params: {article_id: this.article_id},
            data: {
              password: process.env.VUE_APP_PASS,
            }
          });

          if (resp.data.failed)
            this.response = resp.data.msg;
          else
            this.explained = resp.data;
        } catch(e) {
          console.log(e);
        }
      },
      redirectToArticle(article_id:number) {
        router.push({name: 'article', query: {articleid: article_id}});
      },
      is_source_code(index:number) : boolean {
        return this.explained.explained[index].code_snipest.source_code.length > 0;
      },
      prevArticle() {
        router.push({name: 'article', query: {articleid: this.explained.next_prev_article.prv_article_id}});
        
      },
      nextArticle() {
        router.push({name: 'article', query: {articleid: this.explained.next_prev_article.next_article_id}});
      },
    },
    computed: {
      is_there_requirements() : boolean {
        if (this.explained.preqs)
          return this.explained.preqs.length > 0;
        else
          return false;
      },
      next_exist(): boolean {
        if (this.explained.next_prev_article)
          return this.explained.next_prev_article.next_article_id != -1;
        return false;
      },
      prev_exist(): boolean {
        if (this.explained.next_prev_article)
          return this.explained.next_prev_article.prv_article_id != -1;
        return false;
      }
    },
    directives: {
      codehighlighting(el:any) {
        if (!window || !Prism)
          return ;
        window.Prism = window.Prism || {};
        window.Prism.manual = true;
        Prism.highlightAll();
      }
    }
  });
  
  </script>

<style scoped>
.remain-height {
  height: 80vh;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>