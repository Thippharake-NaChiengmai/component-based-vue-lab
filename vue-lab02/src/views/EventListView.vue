<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import EventMeta from '@/components/EventMeta.vue'
import type { Event } from '@/types';
import { ref, onMounted } from 'vue';
import EventService from '@/service/EventService';

const events = ref<Event[]>();

onMounted(() => {
  EventService.getEvents()
    .then(response => {
      events.value = response.data;
    })
    .catch(error => {
      console.error('There was an error!', error);
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
</style>
