<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia';
import { SpeedInsights } from "@vercel/speed-insights/vue"
const messageStore = useMessageStore();
const { messages } = storeToRefs(messageStore);
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
     <div class="py-6">
       <nav>
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
