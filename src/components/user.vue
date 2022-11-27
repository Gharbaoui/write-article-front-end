<template>
    <div class="bg-sky-400 w-full flex w-full h-screen justify-between">
      <div class="bg-blue-400 w-3/4 flex flex-col">
        <div class="h-1/2 flex">
          <div class="flex justify-around flex-col w-1/2 h-full bg-blue-400">
            <div class="flex">
              <span> full name: </span>
              <input type="text" v-model="full_name">
            </div>
  
            <div class="flex">
  
            <span>image file</span>
            <input class="block w-full" @change="userImage" type="file">
            </div>
          </div>
          <div>
            <div class="flex">
              <span> user biography: </span>
              <textarea id="message" v-model="user_biography" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-60" placeholder="Your message..."></textarea>
            </div>
          </div>
        </div>
        <div class="bg-red-300 h-1/2 flex justify-around flex-col w-full">
          <div class="flex">
            <span> contact media: </span>
            <input type="text" v-model="contact_media">
          </div>
          <div class="flex">
            <span> contact_url: </span>
            <input type="text" v-model="contact_url">
          </div>
          <div class="flex">
            <span> other identifier: </span>
            <input type="text" v-model="other_identifier">
          </div> 
          <div class="flex">
            <span> other : </span>
            <input type="text" v-model="other">
          </div> 
        </div>
      </div>


      <div class="w-1/4">
        <div class="bg-red-600 w-full">{{error}}</div>
        <div class="bg-gray-200">
          <div class="flex flex-col items-center justify-center h-screen">
        <div class="flex flex-col">
            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="full_name_check"><span class="ml-2 text-gray-700">full name</span>
            </label>

            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" v-model="user_image_check"><span class="ml-2 text-gray-700">user image</span>
            </label>

            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-orange-600" v-model="user_biography_check"><span class="ml-2 text-gray-700">user biography</span>
            </label>

            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-yellow-600" v-model="contact_check"><span class="ml-2 text-gray-700">contact</span>
            </label>

          <div class="flex">
            <div @click="userUpdate" class="mt-5 mr-5 w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
              done
            </div>
            <div @click="createEmpty" class="mt-5 mr-5 w-24 border-solid border-2 border-sky-500 py-3 text-center rounded-lg bg-sky-400 hover:bg-black text-white font-serif">
              create empty
            </div>
            </div>

        </div>
    </div>
</div>
      </div>
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface UserData {
  [key: string]: any;
  password:string;
}

export default defineComponent({
  name: 'UserComp',
  components:{
  },
  data() {
    return {
      userdata: {password: process.env.VUE_APP_PASS} as UserData,
      full_name: '',
      user_image: null as any,
      user_biography: '',
      contact_media: '',
      contact_url: '',
      other: '',
      other_identifier: '',
      full_name_check: false,
      user_image_check: false,
      user_biography_check: false,
      contact_check: false,
      error: '',
    }
  },
  methods: {
    async createEmpty() {
      this.initUserData();
      try {
        const resp = await axios({
                method: 'post',
                url: `http://${process.env.VUE_APP_BACKEND_API}/user/create`,
                data: this.userdata
        });
        if (resp.data.failed) {
          this.error = resp.data.msg;
        }
      } catch(e) {
        console.log(e);
      }
    },
    initUserData() {
      this.userdata = {password: process.env.VUE_APP_PASS};
      if (this.full_name_check) {
        this.userdata.full_name = this.full_name;
      } if (this.user_image_check) {
        this.userdata.user_image = this.user_image;
      } if (this.user_biography_check) {
        this.userdata.user_biography = this.user_biography
      } if (this.contact_check) {
        this.userdata.contact = [{
          contact_media: this.contact_media,
          contact_url: this.contact_url,
          other: this.other,
          other_identifier: this.other_identifier
        }]
      }
    },
    async userUpdate() {
      this.initUserData();
      try {
        const resp = await axios({
                method: 'patch',
                url: `http://${process.env.VUE_APP_BACKEND_API}/user/update`,
                data: this.userdata
        });
        if (resp.data.failed) {
          this.error = resp.data.msg;
        }
      } catch(e) {
        console.log(e);
      }

    },
    async userImage(event:any)
    {
        try {
          
          if (event.target.files.length > 0)
            this.user_image = await toBase64(event.target.files[0]);
        }catch (e:any)
        {
            console.error(e);
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
  