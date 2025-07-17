<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import EventMeta from '@/components/EventMeta.vue'
import { type Event } from '@/types';
import { ref, onMounted, computed, watchEffect } from 'vue';
import EventService from '@/service/EventService';

const events = ref<Event[] | null>(null);
const totalEvents = ref(0);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2);
  return totalPages > page.value;
});
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
const page = computed(() => props.page);
const size = computed(() => props.size);
onMounted(() => {
 watchEffect(() => {
    events.value = null;
    EventService.getEvents(size.value, page.value)
      .then(response => {
        events.value = response.data;
        totalEvents.value = parseInt(response.headers['x-total-count']);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  });
});
</script>


<template>
   <h1>Events For Good</h1>
   <!-- new element -->
  <div class="events-wrapper">
    <div
      class="event"
      v-for="event in events"
      :key="event.id"
    >
      <EventCard :event="event" />
      <EventMeta :event="event" />
    </div>
  </div>
  <div class="pagination">
  <RouterLink
    id="page-prev"
    :to="{ name: 'event-list-view', query: { page: page - 1, size: size } }"
    rel="prev"
    v-if="page > 1"
  >
    ‹ Prev Page
  </RouterLink>

  <RouterLink
    id="page-next"
    :to="{ name: 'event-list-view', query: { page: page + 1, size: size } }"
    rel="next"
    v-if="hasNextPage"
  >
    Next Page ›
  </RouterLink>
</div>
<div class="page-size-selector">
  <span>Items per page:</span>
  <RouterLink
    v-for="option in [2, 4, 6]"
    :key="option"
    :to="{ name: 'event-list-view', query: { page: 1, size: option } }"
    :class="{ active: option === size }"
  >
    {{ option }}
  </RouterLink>
</div>

</template>

<style scoped>
.events-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.event {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 320px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 320px;
  margin: 2rem auto 1rem;
  padding: 0.5rem 1rem;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem;
  color: #2c3e50;
  transition: color 0.2s ease;
}

.pagination a:hover {
  color: #42b983;
}

#page-prev {
  text-align: left;
  justify-content: flex-start;
}

#page-next {
  text-align: right;
  justify-content: flex-end;
}

.page-size-selector {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.page-size-selector a {
  padding: 4px 8px;
  background: #eee;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}

.page-size-selector a.active {
  background: #42b983;
  color: white;
}

</style>
