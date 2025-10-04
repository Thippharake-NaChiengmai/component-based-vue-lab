<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { SpeedInsights } from "@vercel/speed-insights/vue"
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountPlus, mdiLogin, mdiAccount } from '@mdi/js'
const messageStore = useMessageStore();
const { messages } = storeToRefs(messageStore);
const authStore = useAuthStore();
const router = useRouter();
const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
}else {
  authStore.logout()
}

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <SpeedInsights />
 <div class="text-center font-sans text-gray-700 antialiased">
   <header>
    <div class="animate-fade" v-if="messages">
      <h4>{{ messages }}</h4>
    </div>
    <span class="block text-left text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 py-1">
      Thippharake Na Chiengmai 662115019
    </span>
     <div class="wrapper">
       <nav class="py-6">
        <nav class="flex">
          <ul class="flex navbar-nav ml-auto">
            <li class="nav-item py-2">
              <router-link to="/register" class="nav-link">
                <div class="flex items-center">
                  <SvgIcon type="mdi" :path="mdiAccountPlus"/>
                  <span class="ml-3">Sign Up</span>
                </div>
              </router-link>
            </li>
            <li class="nav-item py-2">
              <router-link to="/login" class="nav-link">
                <div class="flex items-center">
                  <SvgIcon type="mdi" :path="mdiLogin"/>
                  <span class="ml-3">Login</span>
                </div>
              </router-link>
            </li>
          </ul>

          <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
            <li class="nav-item px-2">
              <router-link to="/profile" class="nav-link">
                <div class="flex items-center">
                  <SvgIcon type="mdi" :path="mdiAccount"/>
                  <span class="ml-3">{{ authStore.currentUserName }}</span>
                </div>
              </router-link>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link hover:cursor-pointer" @click="logout">
                <div class="flex items-center">
                  <SvgIcon type="mdi" :path="mdiLogin"/>
                  <span class="ml-3">LogOut</span>
                </div>
              </a>
            </li>
          </ul>
        </nav>
         <RouterLink
           class="font-bold text-gray-700"
           exact-active-class="text-green-500"
           :to="{ name: 'event-list-view' }"
         >
           Event |
         </RouterLink>
         <RouterLink
           class="font-bold text-gray-700"
           exact-active-class="text-green-500"
           :to="{ name: 'about' }"
         >
           About |
         </RouterLink>
         <RouterLink
           class="font-bold text-gray-700"
           exact-active-class="text-green-500"
           :to="{ name: 'students' }"
         >
           students |
         </RouterLink>
         <RouterLink
           class="font-bold text-gray-700"
           exact-active-class="text-green-500"
           :to="{ name: 'add-event' }"
         >
           Add Event |
         </RouterLink>
         <RouterLink
           class="font-bold text-gray-700"
           exact-active-class="text-green-500"
           :to="{ name: 'add-organizer' }"
         >
           Add Organizer |
         </RouterLink>
         <RouterLink
           class="font-bold text-gray-700"
           exact-active-class="text-green-500"
           :to="{ name: 'participants-list' }"
         >
           View Participants
         </RouterLink>
       </nav>
     </div>
   </header>

   <RouterView />
 </div>
</template>
