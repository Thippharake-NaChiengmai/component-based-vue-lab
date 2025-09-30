<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrganizerStore } from '@/stores/organizer';


const organizerStore = useOrganizerStore();
const route = useRoute();
const router = useRouter();

const organizerId = computed(() => Number(route.params.id));
const isLoading = ref(true);
const error = ref<string | null>(null);

const organizer = computed(() => organizerStore.currentOrganizer);
const events = computed(() => {
  if (!organizer.value) return [];
  return organizerStore.getOrganizerEvents(organizer.value.id);
});

async function fetchOrganizer() {
  if (!organizerId.value) return;
  
  isLoading.value = true;
  error.value = null;
  
  try {
    const org = organizerStore.getOrganizerById(organizerId.value);
    if (org) {
      organizerStore.setCurrentOrganizer(org);
    } else {
      // In a real app, you would fetch the organizer from an API here
      error.value = 'Organizer not found';
    }
  } catch (err) {
    console.error('Error fetching organizer:', err);
    error.value = 'Failed to load organizer details';
  } finally {
    isLoading.value = false;
  }
}

function navigateToEvent(eventId: number) {
  router.push({ name: 'event-detail', params: { id: eventId } });
}

onMounted(() => {
  fetchOrganizer();
});
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <button 
      @click="router.go(-1)" 
      class="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
    >
      <span class="mr-1">←</span>
      <span>Back to previous page</span>
    </button>

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

    <div v-else-if="organizer" class="space-y-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ organizer.name }}</h1>
        
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-4">Organizer Information</h2>
          <div class="space-y-2">
            <p><span class="font-medium">ID:</span> {{ organizer.id }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Hosted Events</h2>
          <router-link 
            :to="{ name: 'event-create' }" 
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            v-if="organizer.id"
          >
            Create New Event
          </router-link>
        </div>

        <div v-if="events.length === 0" class="text-center py-8 text-gray-500">
          No events found for this organizer.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="event in events" 
            :key="event.id"
            @click="navigateToEvent(event.id)"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 class="font-semibold text-lg mb-2">{{ event.title }}</h3>
            <p class="text-gray-600 text-sm mb-2">{{ event.date }} at {{ event.time }}</p>
            <p class="text-gray-700 text-sm line-clamp-2">{{ event.description }}</p>
            <div class="mt-3 flex justify-between items-center">
              <span class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {{ event.participants.length }} participants
              </span>
              <span class="text-sm text-gray-500">{{ event.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
