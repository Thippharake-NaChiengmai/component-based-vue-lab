<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref, onMounted } from 'vue'
import OrganizerService from '@/service/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import '@/assets/form.css'

const organizer = ref<Organizer>({
  id: 0,
  organization: '',
  address: ''
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

function saveOrganizer() {
  // Basic validation
  if (!organizer.value.organization) {
    alert('Please provide an organization name')
    return
  }

  // Prepare data for backend - remove id if it's 0 (new organizer)
  const organizerData = { ...organizer.value }
  if (organizerData.id === 0) {
    delete (organizerData as Partial<Organizer>).id
  }

  OrganizerService.saveOrganizer(organizerData)
    .then((response) => {
      store.updateMessages('You are successfully add a new organizer: ' + response.data.organization)
      setTimeout(() => { store.resetMessages() }, 3000)
      router.push({ name: 'event-list-view' })
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <!-- Organizer List -->
    <div class="mt-8">
      <h2 class="eyebrow -text-primary mb-4">Existing Organizers</h2>
      <div v-if="organizers.length === 0" class="text-gray-500 text-sm">
        No organizers found.
      </div>
      <div v-else class="space-y-2">
        <div 
          v-for="org in organizers" 
          :key="org.id"
          class="border border-gray-300 rounded p-3 bg-gray-50"
        >
          <div class="font-medium text-gray-800">{{ org.organization }}</div>
          <div class="text-sm text-gray-600">{{ org.address || 'No address provided' }}</div>
        </div>
      </div>
    </div>

    <h1 class="eyebrow -text-primary">Create an Organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <div class="field">
        <label>Organization *</label>
        <input v-model="organizer.organization" type="text" placeholder="Organization Name" required />
      </div>

      <div class="field">
        <label>Address</label>
        <input v-model="organizer.address" type="text" placeholder="Organization Address" />
      </div>

      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>
    <pre class="-text-gray">{{ organizer }}</pre>
  </div>
</template>
