<script setup lang="ts">
import type { Event, Organizer, Participant } from '@/types'
import { ref, onMounted } from 'vue'
import EventService from '@/service/EventService'
import OrganizerService from '@/service/OrganizerService'
import ParticipantService from '@/service/ParticipantService'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
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
    name: '',
    images: []
  },
  participants: {
    id: 0,
    name: '',
    telNo: ''
  },
  images: []
})

const organizers = ref<Organizer[]>([])
const participants = ref<Participant[]>([])
const selectedParticipants = ref<number[]>([])
const router = useRouter()
const store = useMessageStore()

onMounted(() => {
  loadOrganizers()
  loadParticipants()
})

function loadOrganizers() {
  OrganizerService.getOrganizers()
    .then((response) => {
      organizers.value = response.data
      // Set default organizer if available
      if (organizers.value.length > 0) {
        event.value.organizer = {
          id: organizers.value[0].id,
          name: organizers.value[0].name,
          images: organizers.value[0].images || []
        }
      }
    })
    .catch(() => {
      console.error('Failed to load organizers')
    })
}

function loadParticipants() {
  ParticipantService.getParticipants()
    .then((response) => {
      participants.value = response.data
    })
    .catch(() => {
      console.error('Failed to load participants')
    })
}

function handleOrganizerChange(organizerId: number) {
  const selectedOrganizer = organizers.value.find(org => org.id === organizerId)
  if (selectedOrganizer) {
    event.value.organizer = {
      id: selectedOrganizer.id,
      name: selectedOrganizer.name,
      images: selectedOrganizer.images || []
    }
  }
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

      <h3>Who is your organizer</h3>
      <label>Select an Organizer</label>
      <BaseSelect
        v-model="event.organizer.id"
        :options="organizers"
        :label="'Select an Organizer'"
        @update:modelValue="handleOrganizerChange"
      />

      <h3>Select Participants</h3>
      <BaseCheckbox
        v-model="selectedParticipants"
        :options="participants"
        label="Participants who will join this event"
      />
      
      <h3>Event Images (optional)</h3>
      <div class="field">
        <ImageUpload v-model="event.images" />
      </div>

      <button class="button" type="submit">Submit</button>
    </form>
    <pre class="-text-gray">{{ event }}</pre>
    <pre class="-text-gray">Selected Participants: {{ selectedParticipants }}</pre>
  </div>
</template>