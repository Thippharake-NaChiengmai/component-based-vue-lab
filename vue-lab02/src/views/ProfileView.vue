<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiEmail, mdiShieldAccount, mdiCalendar, mdiImageMultiple } from '@mdi/js'

const authStore = useAuthStore()
const router = useRouter()

// Redirect to login if not authenticated
if (!authStore.user || !authStore.token) {
  router.push({ name: 'login' })
}

const user = computed(() => authStore.user)
const userRoles = computed(() => user.value?.roles || [])
const isAdmin = computed(() => authStore.isAdmin)

// Parse user data to get additional fields if available
const userData = computed(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      return JSON.parse(storedUser)
    } catch {
      return user.value
    }
  }
  return user.value
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <!-- Banner -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
        
        <!-- Profile Content -->
        <div class="px-6 py-8 -mt-16">
          <!-- Avatar -->
          <div class="flex justify-center mb-6">
            <div class="h-32 w-32 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
              <SvgIcon type="mdi" :path="mdiAccount" class="w-20 h-20 text-gray-400" />
            </div>
          </div>

          <!-- User Info -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              {{ user?.name || 'User' }}
            </h1>
            <div class="flex items-center justify-center gap-2">
              <span 
                v-if="isAdmin"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                <SvgIcon type="mdi" :path="mdiShieldAccount" class="w-4 h-4 mr-1" />
                Administrator
              </span>
              <span 
                v-for="role in userRoles" 
                :key="role"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ role }}
              </span>
            </div>
          </div>

          <!-- Account Details -->
          <div class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">
              Account Information
            </h2>

            <!-- ID -->
            <div class="flex items-start">
              <div class="flex-shrink-0 w-1/3">
                <span class="text-sm font-medium text-gray-500">User ID</span>
              </div>
              <div class="flex-grow">
                <span class="text-base text-gray-900">{{ user?.id || 'N/A' }}</span>
              </div>
            </div>

            <!-- Name -->
            <div class="flex items-start">
              <div class="flex-shrink-0 w-1/3">
                <span class="text-sm font-medium text-gray-500">Name</span>
              </div>
              <div class="flex-grow">
                <span class="text-base text-gray-900">{{ user?.name || 'N/A' }}</span>
              </div>
            </div>

            <!-- Email -->
            <div class="flex items-start" v-if="userData?.email">
              <div class="flex-shrink-0 w-1/3">
                <div class="flex items-center gap-2">
                  <SvgIcon type="mdi" :path="mdiEmail" class="w-4 h-4 text-gray-500" />
                  <span class="text-sm font-medium text-gray-500">Email</span>
                </div>
              </div>
              <div class="flex-grow">
                <span class="text-base text-gray-900">{{ userData.email }}</span>
              </div>
            </div>

            <!-- Username -->
            <div class="flex items-start" v-if="userData?.username">
              <div class="flex-shrink-0 w-1/3">
                <span class="text-sm font-medium text-gray-500">Username</span>
              </div>
              <div class="flex-grow">
                <span class="text-base text-gray-900">{{ userData.username }}</span>
              </div>
            </div>

            <!-- First Name -->
            <div class="flex items-start" v-if="userData?.firstname">
              <div class="flex-shrink-0 w-1/3">
                <span class="text-sm font-medium text-gray-500">First Name</span>
              </div>
              <div class="flex-grow">
                <span class="text-base text-gray-900">{{ userData.firstname }}</span>
              </div>
            </div>

            <!-- Last Name -->
            <div class="flex items-start" v-if="userData?.lastname">
              <div class="flex-shrink-0 w-1/3">
                <span class="text-sm font-medium text-gray-500">Last Name</span>
              </div>
              <div class="flex-grow">
                <span class="text-base text-gray-900">{{ userData.lastname }}</span>
              </div>
            </div>

            <!-- Events (for organizers) -->
            <div class="flex items-start" v-if="user?.ownEvents">
              <div class="flex-shrink-0 w-1/3">
                <div class="flex items-center gap-2">
                  <SvgIcon type="mdi" :path="mdiCalendar" class="w-4 h-4 text-gray-500" />
                  <span class="text-sm font-medium text-gray-500">Own Events</span>
                </div>
              </div>
              <div class="flex-grow">
                <span class="text-base text-gray-900">{{ user.ownEvents.length }} events</span>
              </div>
            </div>

            <!-- Images -->
            <div class="flex items-start" v-if="user?.images && user.images.length > 0">
              <div class="flex-shrink-0 w-1/3">
                <div class="flex items-center gap-2">
                  <SvgIcon type="mdi" :path="mdiImageMultiple" class="w-4 h-4 text-gray-500" />
                  <span class="text-sm font-medium text-gray-500">Profile Images</span>
                </div>
              </div>
              <div class="flex-grow">
                <div class="grid grid-cols-3 gap-2">
                  <img 
                    v-for="(image, index) in user.images" 
                    :key="index"
                    :src="image" 
                    :alt="`Profile ${index + 1}`"
                    class="w-full h-20 object-cover rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="router.push({ name: 'event-list-view' })"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              View Events
            </button>
            <button
              v-if="isAdmin"
              @click="router.push({ name: 'add-event' })"
              class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
            >
              Create Event
            </button>
            <button
              @click="router.push({ name: 'event-list-view' })"
              class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <!-- Account Stats (Optional) -->
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-blue-600">{{ user?.ownEvents?.length || 0 }}</div>
          <div class="text-sm text-gray-600 mt-1">Events Created</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-purple-600">{{ userRoles.length }}</div>
          <div class="text-sm text-gray-600 mt-1">Roles</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-3xl font-bold text-green-600">Active</div>
          <div class="text-sm text-gray-600 mt-1">Account Status</div>
        </div>
      </div>
    </div>
  </div>
</template>
