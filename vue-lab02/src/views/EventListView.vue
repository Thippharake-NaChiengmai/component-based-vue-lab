<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import EventCard from '@/components/EventCard.vue';
import EventMeta from '@/components/EventMeta.vue';
import EventService from '@/service/EventService';
import BaseInput from '@/components/BaseInput.vue';

// Import the Event type from types
import type { Event } from '@/types';

// Use the imported Event type
// No need to redefine it here

const router = useRouter();
const route = useRoute();

// Reactive state
const keyword = ref('');
const totalEvents = ref(0);
const events = ref<Event[]>([]);

// Initialize keyword from query params if present
onMounted(() => {
  if (route.query.q) {
    keyword.value = route.query.q as string;
  }
});

// Computed properties
const page = computed(() => {
  const pageParam = route.query.page;
  return typeof pageParam === 'string' ? parseInt(pageParam, 10) || 1 : 1;
});

const size = computed(() => {
  const sizeParam = route.query.size;
  return typeof sizeParam === 'string' ? parseInt(sizeParam, 10) || 3 : 3;
});

const hasNextPage = computed(() => {
  return page.value * size.value < totalEvents.value;
});

// Watch for changes in route query params
watchEffect(() => {
  fetchEvents(page.value, size.value, keyword.value);
});

// Fetch events with search and pagination
function fetchEvents(pageNum: number, pageSize: number, searchTerm: string) {
  const queryFunction = searchTerm.trim()
    ? EventService.getEventsByKeyword(searchTerm, pageSize, pageNum)
    : EventService.getEvents(pageSize, pageNum);

  queryFunction
    .then((response) => {
      events.value = response.data;
      const countHeader = response.headers['x-total-count'];
      totalEvents.value = typeof countHeader === 'string' ? parseInt(countHeader, 10) : 0;
    })
    .catch(() => {
      router.push({ name: 'network-error-view' });
    });
}

// Handle search input with debounce
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

function updateKeyword(value: string | boolean | undefined) {
  const searchTerm = value?.toString() || '';
  keyword.value = searchTerm;
  
  // Clear previous timeout
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  
  // Set new timeout for debouncing
  debounceTimeout = setTimeout(() => {
    // Reset to first page when searching
    router.push({
      name: 'event-list-view',
      query: { 
        page: 1, 
        size: size.value,
        ...(searchTerm ? { q: searchTerm } : {})
      }
    });
  }, 300); // 300ms debounce time
}
</script>


<template>
   <h1>Events For Good</h1>
   <!-- new element -->
  <div class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput 
        v-model="keyword"
        label="Search..."
        type="text"
        @update:modelValue="updateKeyword"
        class="w-full"/>
    </div>
    <div class="flex flex-col items-stretch w-80"
      v-for="event in events"
      :key="event.id"
    >
      <EventCard :event="event" />
      <EventMeta :event="event" />
    </div>
  </div>
  <div class="flex justify-between items-center max-w-80 mx-auto my-8 py-2 px-4 border-t border-b border-gray-300">
  <RouterLink
    id="page-prev"
    :to="{
      name: 'event-list-view',
      query: { 
        page: page - 1, 
        size: size,
        ...(keyword ? { q: keyword } : {})
      }
    }"
    rel="prev"
    v-if="page > 1"
    class="flex-1 text-left font-bold p-2 text-gray-600 hover:text-green-500 transition-colors duration-200"
  >
    ‹ Prev Page
  </RouterLink>

  <RouterLink
    id="page-next"
    :to="{
      name: 'event-list-view',
      query: { 
        page: page + 1, 
        size: size,
        ...(keyword ? { q: keyword } : {})
      }
    }"
    rel="next"
    v-if="hasNextPage"
    class="flex-1 text-right font-bold p-2 text-gray-600 hover:text-green-500 transition-colors duration-200"
  >
    Next Page ›
  </RouterLink>
</div>
<div class="mt-4 flex gap-2 justify-center">
  <span>Items per page:</span>
  <RouterLink
    v-for="option in [2, 3, 4, 6]"
    :key="option"
    :to="{
      name: 'event-list-view',
      query: { 
        page: 1, 
        size: option,
        ...(keyword ? { q: keyword } : {})
      }
    }"
    :class="[
      'px-2 py-1 bg-gray-200 rounded text-gray-600 no-underline hover:bg-gray-300 transition-colors duration-200',
      { 'bg-green-500 text-white hover:bg-green-600': option === size }
    ]"
  >
    {{ option }}
  </RouterLink>
</div>

</template>