<script setup lang="ts">
import type { Event, Organizer } from '@/types'
import { ref, onMounted } from 'vue'
import EventService from '@/service/EventService'
import BaseInput from '@/components/BaseInput.vue'
import OrganizerService from '@/service/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import ImageUpload from '@/components/ImageUpload.vue'
import '@/assets/form.css'

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petAllowed: false,
  organizer: {
    id: 0,
    name: ''
  },
  images: []
})

const organizers = ref<Organizer[]>([])
const router = useRouter()
const store = useMessageStore()

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

function saveEvent() {
  // Basic validation
  if (!event.value.title || !event.value.category || !event.value.description) {
    alert('Please fill in all required fields (Title, Category, Description)')
    return
  }
  
  // Prepare data for backend - remove id if it's 0 (new event)
  const eventData = { ...event.value }
  if (eventData.id === 0) {
    delete (eventData as Partial<Event>).id
  }

  EventService.saveEvent(eventData)
    .then((response) => {
      store.updateMessages('You are successfully add a new event for ' + response.data.title)
      setTimeout(() => { store.resetMessages() }, 3000)
      router.push({ name: 'event-layout-view', params: { id: response.data.id } })
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1 class="eyebrow -text-primary">Create an event</h1>
    <form @submit.prevent="saveEvent">
      <BaseInput v-model="event.category" type="text" label="Category"/>
      <h3>Name & describe your event</h3>
      <BaseInput v-model="event.title" type="text" label="Title"/>
      <BaseInput v-model="event.description" type="text" label="Description"/>
      <BaseInput v-model="event.location" type="text" label="Location"/>
      <BaseInput v-model="event.date" type="date" label="Date"/>
      <BaseInput v-model="event.time" type="time" label="Time"/>
      <BaseInput v-model="event.petAllowed" type="checkbox" label="Pet Allowed"/>
      <BaseInput v-model="event.organizer" type="text" label="Organizer"/>

      <h3>Event Images</h3>
      <div class="field">
        <ImageUpload v-model="event.images" />
      </div>

      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>
    <pre class="-text-gray">{{ event }}</pre>
  </div>
</template>