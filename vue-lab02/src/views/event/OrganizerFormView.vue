<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref, onMounted } from 'vue'
import OrganizerService from '@/service/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import '@/assets/form.css'
import ImageUpload from '@/components/ImageUpload.vue'

const organizer = ref<Organizer>({
  id: 0,
  name: '',
  images: []
})

const organizers = ref<Organizer[]>([])
const router = useRouter()
const store = useMessageStore()

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

function saveOrganizer() {

  // Prepare data for backend - remove id if it's 0 (new organizer)
  const organizerData = { ...organizer.value }
  if (organizerData.id === 0) {
    delete (organizerData as Partial<Organizer>).id
  }

  OrganizerService.saveOrganizer(organizerData)
    .then((response) => {
      store.updateMessages('You are successfully add a new organizer: ' + response.data.name)
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
        <router-link 
          v-for="org in organizers" 
          :key="org.id"
          :to="{ name: 'organizer-detail', params: { id: org.id.toString() } }"
          class="block border border-gray-300 rounded p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div class="font-medium text-gray-800">{{ org.name }}</div>
        </router-link>
      </div>
    </div>

    <h1 class="eyebrow -text-primary">Create an Organizer</h1>
    <form @submit.prevent="saveOrganizer" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Organizer Name</label>
        <input
          id="name"
          v-model="organizer.name"
          type="text"
          placeholder="Enter organizer name"
          class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
          aria-required="true"
        />
      </div>

      <div>
        <h3 class="eyebrow -text-base">Organizer Images (optional)</h3>
        <div class="field">
          <ImageUpload v-model="organizer.images" />
        </div>
      </div>

      <div>
        <button
          class="button"
          type="submit"
          :disabled="!organizer.name || organizer.name.trim() === ''"
          :aria-disabled="!organizer.name || organizer.name.trim() === ''"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
