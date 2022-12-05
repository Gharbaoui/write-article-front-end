<template>
    <div class="h-full flex flex-col">
      <div class="h-2/6  w-full flex justify-around">
        <div class="w-1/3 flex flex-col justify-around">
            <span class="text-white text-2xl">prerequisite</span>
            <div>
                <span>preqrequisite title: </span>
                <input type="text" v-model="preq.req_title">
            </div>
            <div>
                <span>preqrequisite url: </span>
                <input type="text" v-model="preq.req_url">
            </div>
            <div>
                <span>is preqrequisite local: </span>
                <input type="checkbox" class="w-8 h-8" v-model="preq.is_local"/>
            </div>
        </div>
        <div class="w-1/3  flex flex-col justify-around">
            <span class="text-white text-xl">prev:</span>
            <div class="flex justify-around">
                <div>
                    <span>value: </span>
                    <input type="text" v-model="prv_next.prev_value">
                </div>
                <div>
                    <span>check:</span>
                    <input type="checkbox" class="w-8 h-8" v-model="prv_next.prev_checked" name="" id="">
                </div>
            </div>
            <span class="text-white text-xl">next:</span>
            <div class="flex justify-around">
                <div>
                    <span>value: </span>
                    <input type="text" v-model="prv_next.next_value">
                </div>
                <div>
                    <span>check:</span>
                    <input type="checkbox" class="w-8 h-8" v-model="prv_next.nex" name="" id="">
                </div>
            </div>
        </div>
      </div>
      <div class="h-3/6 bg-blue-600 w-full flex justify-around">
        <div class="w-1/3 flex flex-col justify-around">
            <div class="flex items-center w-full">
                <span class="text-white text-2xl w-1/6">explaine:</span>
                <textarea class="w-5/6" cols="50" rows="5" v-model="explain.explain_text"></textarea>
            </div>
            <div class="text-white text-2xl">
                <span class="block">image:</span>
                <span>path: </span>
                <input type="text" v-model="explain.image">
            </div>
            <div>
                <span class="text-white text-2xl">image:</span>
                <input type="file" @change="imageExplain">
            </div>
        </div>
        <div class="w-1/3">
            <span class="text-white text-2xl block">code: </span>
            <textarea cols="70" rows="10" v-model="explain.source_code"></textarea>
            <div class="flex w-full justify-around">
                <div>
                    <span>explain:</span>
                    <input type="checkbox" v-model="explain.explain_check">
                </div>
                <div>
                    <span>image:</span>
                    <input type="checkbox" v-model="explain.image_check">
                </div>
                <div>
                    <span>code:</span>
                    <input type="checkbox" v-model="explain.source_code_checked">
                </div>
            </div>
            <div class="flex w-full justify-around">
                <div>
                    <span>add:</span>
                    <input type="checkbox" v-model="explain.explain_add">
                </div>
                <div>
                    <span>update:</span>
                    <input type="checkbox" v-model="explain.explain_update">
                </div>
            </div>
            <div>
                <span>Index: </span>
                <input type="text" v-model="explain.explain_update_at">
            </div>
        </div>
      </div>
      <div class="h-1/6 bg-purple-600 w-full">
        <div class="flex w-full justify-around">
                <span>Preq: </span>
                <div>
                    <span>update:</span>
                    <input type="checkbox" v-model="preq.preq_update">
                </div>
                <div>
                    <span>add:</span>
                    <input type="checkbox" v-model="preq.preq_add">
                </div>
                <div>
                    <span>index:</span>
                    <input type="text"  v-model="preq.preq_update_at">
                </div>
            </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ArticleCompo',
    data() {
        return {
            preq: {
                req_title: '',
                req_url: '',
                is_local: false,
                preq_update: false,
                preq_add: false,
                preq_update_at: -1,
            },
            prv_next: {
                prev_value: -1,
                next_value: -1,
                prev_checked: false,
                next_checked: false
            },
            explain: {
                explain_text: '',
                image: null as any,
                source_code: '',
                explain_check: false,
                image_check: false,
                source_code_checked: false,
                explain_add: false,
                explain_update: false,
                explain_update_at: -1,
            }
        }
    },
    methods: {
    async imageExplain(event:any)
      {
        try {  
            if (event.target.files.length > 0)
                this.explain.image = await toBase64 (event.target.files[0]);      
        }catch (e:any)
        {
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
  