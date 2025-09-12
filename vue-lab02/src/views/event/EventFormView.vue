<script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue'
import EventService from '@/service/EventService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
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
    organization: '',
    address: ''
  }
})
const router = useRouter()
const store = useMessageStore()

function saveEvent() {
  // Basic validation
  if (!event.value.title || !event.value.category || !event.value.description) {
    alert('Please fill in all required fields (Title, Category, Description)')
    return
  }
  

  EventService.saveEvent(event.value)
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
      <div class="field">
        <label>Category *</label>
        <input v-model="event.category" type="text" placeholder="Category" required />
      </div>

      <h3 class="eyebrow -text-base">Name & describe your event</h3>
      <div class="field">
        <label>Title *</label>
        <input v-model="event.title" type="text" placeholder="Title" required />
      </div>
      <div class="field">
        <label>Description *</label>
        <input v-model="event.description" type="text" placeholder="Description" required />
      </div>

      <h3 class="eyebrow -text-base">When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <input v-model="event.date" type="date" />
      </div>
      <div class="field">
        <label>Time</label>
        <input v-model="event.time" type="time" />
      </div>

      <h3 class="eyebrow -text-base">Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input v-model="event.location" type="text" placeholder="Location" />
      </div>

      <h3 class="eyebrow -text-base">Additional Info</h3>
      <div class="field">
        <label>
          <input v-model="event.petAllowed" type="checkbox" />
          Pets Allowed
        </label>
      </div>

      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>
    <pre class="-text-gray">{{ event }}</pre>
  </div>
</template>