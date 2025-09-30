<script setup lang="ts">
import type { Event, Organizer } from '@/types'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import OrganizerService from '@/service/OrganizerService'

const props = defineProps<{ event: Event }>()
const router = useRouter()
const organizers = ref<Organizer[]>([])

onMounted(() => {
  loadOrganizers()
})

function loadOrganizers() {
  OrganizerService.getOrganizers()
    .then((response) => {
      organizers.value = response.data
    })
    .catch(() => {
      console.error('Failed to load organizers')
    })
}
</script>

<template>
  <div class="text-right">
    <p class="text-sm m-0">{{ event.category }}</p>
    <p class="text-sm m-0">
      <router-link 
        v-if="event.organizer"
        :to="{ name: 'organizer-detail', params: { id: event.organizer.id.toString() } }"
        class="text-blue-600 hover:text-blue-800 hover:underline"
      >
        {{ event.organizer.name }}
      </router-link>
    </p>
  </div>
</template>
