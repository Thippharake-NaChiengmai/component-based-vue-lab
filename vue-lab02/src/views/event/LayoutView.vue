<script setup lang="ts">
import { useEventStore } from '@/stores/event';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useEventStore();
const { currentEvent } = storeToRefs(store);

// Ensure we have a valid event
const event = computed(() => currentEvent.value);
</script>
<template>
  <div v-if="event && event.id">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'event-detail-view', params: { id: event.id } }">Details</router-link> |
      <router-link :to="{ name: 'event-register-view', params: { id: event.id } }">Register</router-link> |
      <router-link :to="{ name: 'event-edit-view', params: { id: event.id } }">Edit</router-link>
    </nav>
    <RouterView :event="event" />
  </div>
</template>