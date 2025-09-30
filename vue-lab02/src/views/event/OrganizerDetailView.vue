<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useOrganizerStore } from '@/stores/organizer';

const organizerStore = useOrganizerStore();
const route = useRoute();

const organizerId = computed(() => Number(route.params.id));
const isLoading = ref(true);
const error = ref<string | null>(null);

const organizer = computed(() => organizerStore.currentOrganizer);

async function fetchOrganizer() {
  if (!organizerId.value) return;
  
  isLoading.value = true;
  error.value = null;
  
  try {
    const org = organizerStore.getOrganizerById(organizerId.value);
    if (org) {
      organizerStore.setCurrentOrganizer(org);
    } else {
      error.value = 'Organizer not found';
    }
  } catch (err) {
    console.error('Error fetching organizer:', err);
    error.value = 'Failed to load organizer details';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchOrganizer();
});
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading organizer details...</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
      <button 
        @click="fetchOrganizer" 
        class="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
      >
        Retry
      </button>
    </div>

    <div v-else-if="organizer" class="space-y-6">
      <!-- Organizer Header -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ organizer.name }}</h1>
      </div>

      <!-- Organizer Images -->
      <div v-if="organizer.images && organizer.images.length > 0" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Gallery</h2>
        <div class="flex flex-row flex-wrap justify-center gap-4">
          <img 
            v-for="(image, index) in organizer.images" 
            :key="index" 
            :src="image" 
            :alt="`${organizer.name} image ${index + 1}`"
            class="border-solid border-gray-200 border-2 rounded p-1 w-40 h-40 object-cover"
          />
        </div>
      </div>

      <!-- No Images Message -->
      <div v-else class="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        No images available for this organizer.
      </div>
    </div>
  </div>
</template>
