<template>
    <div class="flex w-full h-full flex-col">
        <div class="flex h-1/4">
            <div class="w-1/2 bg-blue-600 h-full flex flex-col justify-center">
                <div>
                    <span class="text-white text-xl">Article id: </span>
                    <input type="text" v-model="article_id">
                </div>
            </div>
            <div class="w-1/2 bg-red-400 h-full">
                <span class="block text-white text-2xl">Response: </span>
                <textarea cols="60" rows="4" v-model="reponse_msg" :class="{'bg-red-300 rotate-12': failure}"></textarea>
            </div>
        </div>
        <div class="flex h-1/4 w-full">
            <div class="h-full bg-red-400 flex flex-col justify-around w-1/3">
                <div>
                    <label class="text-white text-xl">Perq Title: </label>
                    <input type="text" v-model="preq_title">
                </div>
                <div>
                    <label class="text-white text-xl">Perq Url: </label>
                    <input type="text" v-model="preq_url">
                </div>
                <div>
                    <label class="text-white text-xl">Is Local: </label>
                    <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="preq_is_local">
                </div>
            </div>
            <div class="h-full bg-blue-400 w-1/3 flex items-center">
                <div @click="addPreq" class="cursor-pointer flex justify-center items-center h-1/2 w-24 mr-5 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
                    Add
                </div>
                <div @click="updatePreq" class="cursor-pointer flex justify-center items-center h-1/2 w-24 mr-5 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
                    update
                </div>
                <div @click="removePreq" class="cursor-pointer flex justify-center items-center h-1/2 w-24 mr-10 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
                    remove
                </div>
                <div class="">
                    <span class="text-white text-xl">Index: </span>
                    <input type="text" v-model="preq_index">
                </div>
            </div>
            <div class="h-full bg-red-200 w-1/3 flex justify-between">
                <div class="flex flex-col h-full justify-around">
                    <div>
                        <label class="text-white text-2xl">Prev:</label>
                        <input type="text" v-model="prev_value">
                    </div>
                    <div @click="updatePrev" class="cursor-pointer flex justify-center items-center h-10 w-24 mr-10 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
                        update
                    </div>
                </div>
                <div class="flex flex-col h-full justify-around">
                    <div>
                        <label class="text-white text-2xl">Next:</label>
                        <input type="text" v-model="next_value">
                    </div>
                    <div class="flex justify-end">
                        <div @click="updateNext" class="cursor-pointer flex justify-center items-center h-10 w-24 mr-10 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
                            next
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ArticleReqsCompo',
    data() {
        return {
            article_id: this.$route.query.article_id,
            preq_title: '',
            preq_url: '',
            preq_is_local: false,
            preq_index: -1,
            reponse_msg: '',
            failure: false,
            prev_value: -1,
            next_value: -1,
        }
    },
    methods: {
        async addPreq() {
            console.log('adding');
        },
        async removePreq() {
            console.log(`removing`);
        },
        async updatePreq() {
            console.log('update');
        },
        async updatePrev() {
            console.log(`prev upadted`);
        },
        async updateNext() {
            console.log(`next upadted`);
        }
    },
    watch: {
        failure() {
            setTimeout(() => {
                this.failure = false;
            }, 1000);
        }
    }
  });
  </script>
  