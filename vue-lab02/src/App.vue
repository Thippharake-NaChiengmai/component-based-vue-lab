<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia';
const messageStore = useMessageStore();
const { messages } = storeToRefs(messageStore);
</script>

<template>
  <speedInsights/>
 <div class="text-center font-sans text-gray-700 antialiased">
   <header>
    <div class="animate-fade" v-if="messages">
      <h4>{{ messages }}</h4>
    </div>
    <h1 class="text-start text-red-500">Deploy With Vercel</h1>
     <div class="py-6">
       <nav>
         <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'event-list-view' }">Event</RouterLink> |
         <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'students' }">Student</RouterLink> |
         <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'about' }">About</RouterLink>
       </nav>
     </div>
   </header>

   <RouterView />
 </div>
</template>
