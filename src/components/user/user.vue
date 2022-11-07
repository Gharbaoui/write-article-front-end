<template>
    <div class="flex flex-col w-full items-center mt-2 remain-height">
        <div class="w-1/2 h-full rounded-lg flex flex-col justify-start lg:justify-around">
          <div class="flex flex-col items-center">
            <!-- user icon -->
            <img class="rounded-full max-w-xs w-48" :src="user_img" alt="user-image">
            <div class="mt-3 font-serif font-bold text-white">{{full_name}}</div>
          </div>
          <div class="
          overflow-y-auto hidden lg:block
          text-center w-full mt-5 text-white font-mono py-5 border-line border-slate-200 border-t-2">
            {{user_biography}}
          </div>
          <div class="flex flex-row justify-around w-full mt-5 text-white font-mono py-5 border-line border-slate-200 border-t-2">
            <!-- contacts -->
            <div v-for="(contact, index) in user_contacts" :key="index">
              <button class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-700 mr-6 cursor-pointer">
                <a :href="contact.contact_url" target="_blank">{{contact.contact_media}} </a>
              </button>
            </div>
          </div>
        </div>
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';
import {User} from './types/user';
import axios from 'axios';

export default defineComponent({
  name: 'UserCompo',
  mounted() {
    this.fillUserInfo();
  },
  data() {
    return {
      user: {} as User,
    }
  },
  computed: {
    user_img () : string
    {
      return require("@/assets/user/user-img.jpg");
    },
    full_name(): string {
      return this.uppercaseString(this.user.full_name);
    },
    user_biography() : string {
      return this.uppercaseString(this.user.user_biography);
    },
    user_contacts(): any {
      return this.user.contact;
    }
  },
  methods: {
    uppercaseString(str:string): string
    {
      if (!str || str.length === 0)
        return ``;
      const words = str.split(` `);
      let new_words: Array<string> = [];
      for (let w of words) {
        new_words.push(w[0].toUpperCase() + w.slice(1));
      }
      return new_words.join(` `);
    },
    async fillUserInfo()
    {
      try {
        const resp = await axios({
                method: 'get',
                url: `http://${process.env.VUE_APP_BACKEND_API}/user`,
        });
        this.user = resp.data;
      } catch(e) {
        console.log(`fillUserInfo`);
      }
    }
  },
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