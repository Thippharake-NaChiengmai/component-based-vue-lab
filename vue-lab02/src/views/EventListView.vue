<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import EventMeta from '@/components/EventMeta.vue'
import { type Event } from '@/types';
import { ref, onMounted, computed, watchEffect } from 'vue';
import EventService from '@/service/EventService';
import router from '@/router';

const events = ref<Event[] | null>(null);
const totalEvents = ref(0);

const props = defineProps({
  page: {
    type: Number,
    default: true
  },
  size: {
    type: Number,
    default: true
  }
});

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / size.value);
  return totalPages > page.value;
});

const page = computed(() => props.page);
const size = computed(() => props.size);
onMounted(() => {
 watchEffect(() => {
    EventService.getEvents(size.value, page.value)
      .then(response => {
        events.value = response.data;
        totalEvents.value = parseInt(response.headers['x-total-count']);
      })
      .catch(error => {
        console.error('There was an error!', error);
        router.push({ name: 'network-error' });
      })
  });
});
</script>


<template>
   <h1>Events For Good</h1>
   <!-- new element -->
  <div class="flex flex-col items-center">
    <div
      class="flex flex-col items-stretch w-80"
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
    :to="{ name: 'event-list-view', query: { page: page - 1, size: size } }"
    rel="prev"
    v-if="page > 1"
    class="flex-1 text-left font-bold p-2 text-gray-600 hover:text-green-500 transition-colors duration-200"
  >
    ‹ Prev Page
  </RouterLink>

  <RouterLink
    id="page-next"
    :to="{ name: 'event-list-view', query: { page: page + 1, size: size } }"
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
    :to="{ name: 'event-list-view', query: { page: 1, size: option } }"
    :class="[
      'px-2 py-1 bg-gray-200 rounded text-gray-600 no-underline hover:bg-gray-300 transition-colors duration-200',
      { 'bg-green-500 text-white hover:bg-green-600': option === size }
    ]"
  >
    {{ option }}
  </RouterLink>
</div>

</template>