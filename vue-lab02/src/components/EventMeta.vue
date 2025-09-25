<script setup lang="ts">
import type { Event, Organizer } from '@/types'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import OrganizerService from '@/service/OrganizerService'

const props = defineProps<{ event: Event }>()
const router = useRouter()
const organizers = ref<Organizer[]>([])

onMounted(() => {
  loadOrganizers()
})

function loadOrganizers() {
  OrganizerService.getOrganizers(100, 1)
    .then((response) => {
      organizers.value = response.data
    })
    .catch(() => {
      console.error('Failed to load organizers')
    })
}

const matchedOrganizer = computed(() => {
  if (!props.event.organizer) return null
  return organizers.value.find(org => org.organization === props.event.organizer)
})

function navigateToOrganizer(organizer: Organizer) {
  router.push({
    name: 'organizer-detail',
    params: { id: organizer.id }
  })
}
</script>

<template>
  <div class="text-right">
    <p class="text-sm m-0">{{ event.category }}</p>
    <p class="text-sm m-0">
      <span 
        v-if="matchedOrganizer"
        class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
        @click="navigateToOrganizer(matchedOrganizer)"
      >
        {{ event.organizer }}
      </span>
      <span v-else>
        {{ event.organizer }}
      </span>
    </p>
    <p v-if="matchedOrganizer" class="text-xs m-0 text-gray-600">
      {{ matchedOrganizer.address }}
    </p>
  </div>
</template>
