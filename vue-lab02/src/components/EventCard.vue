<script setup lang="ts">
import { type Event } from '@/types';
 defineProps<{
  event: Event;
}>();
</script>
<template>
    <routerLink class="event-link" :to="{ name: 'event-detail-view', params: { id: event.id } }">
    <div class="cursor-pointer border border-gray-600 p-4 w-64 mb-6 
    hover:scale-101 hover:shadow-sp">
      <h2>{{ event.title }}</h2>
      <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
  </routerLink>
</template>

<style scoped>
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2); 
}

.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>