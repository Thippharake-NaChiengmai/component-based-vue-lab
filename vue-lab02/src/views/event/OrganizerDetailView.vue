<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { type Organizer } from '@/types';
import OrganizerService from '@/service/OrganizerService';

const organizer = ref<Organizer>({
  id: 0,
  organization: '',
  address: '',
  images: []
});

const route = useRoute();

onMounted(async () => {
  const organizerId = Number(route.params.id);
  if (organizerId) {
    try {
      const response = await OrganizerService.getOrganizer(organizerId);
      organizer.value = response.data;
    } catch (error) {
      console.error('Error fetching organizer:', error);
    }
  }
});
</script>

<template>
  <div class="p-4">
    <button @click="$router.go(-1)" class="flex items-start">
      <span class="mr-1">←</span>
      <span>back</span>
    </button>

    <div v-if="!organizer.organization" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-600">Loading organizer details...</p>
    </div>

    <div v-else>
      <h1 class="text-2xl font-bold mb-4">{{ organizer.organization }}</h1>
      
      <div v-if="organizer.address" class="mb-6">
        <p class="text-gray-700">{{ organizer.address }}</p>
      </div>

      <div class="flex justify-center my-4">
        <div v-if="organizer.images && organizer.images.length > 0" class="border border-gray-200 rounded p-1 w-40 hover:shadow-lg transition-shadow">
          <img 
            v-for="(image, index) in organizer.images" 
            :key="index" 
            :src="image" 
            :alt="`${organizer.organization} image ${index + 1}`"
            class="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>
