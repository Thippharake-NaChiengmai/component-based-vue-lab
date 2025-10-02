<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ParticipantService from '@/service/ParticipantService';
import type { Participant } from '@/types';

const participants = ref<Participant[]>([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const response = await ParticipantService.getParticipants();
    participants.value = response.data;
  } catch (err) {
    error.value = 'Failed to load participants. Please try again later.';
    console.error('Error loading participants:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Participants</h1>
    
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p class="mt-2">Loading participants...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="participants.length === 0" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
      <p>No participants found.</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="participant in participants" :key="participant.id" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">{{ participant.name }}</h2>
            <p class="text-gray-600">Phone: {{ participant.telNo }}</p>
          </div>
        </div>

        <div v-if="participant.eventHistory" class="mt-4">
          <template v-if="participant.eventHistory.length > 0">
            <h3 class="text-lg font-medium text-gray-800 mb-2">Attended Events:</h3>
            <ul class="space-y-2">
              <li v-for="event in participant.eventHistory" :key="event.id" class="bg-gray-50 p-3 rounded-md">
                <div class="flex justify-between">
                  <div>
                    <h4 class="font-medium text-gray-800">{{ event.title || 'Untitled Event' }}</h4>
                    <p v-if="event.date || event.time" class="text-sm text-gray-600">
                      {{ event.date }} <span v-if="event.time">at {{ event.time }}</span>
                    </p>
                    <p v-if="event.location" class="text-sm text-gray-600">{{ event.location }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </template>
          <div v-else class="mt-4 text-gray-500">
            No event history available.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: #2563eb; /* text-blue-600 */
  font-weight: 500; /* font-medium */
}
</style>