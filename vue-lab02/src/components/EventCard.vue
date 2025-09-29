<script setup lang="ts">
import { type Event } from '@/types';
 defineProps<{
  event: Event;
}>();
</script>
<template>
    <routerLink class="no-underline text-gray-700" :to="{ name: 'event-detail-view', params: { id: event.id } }">
    <div class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px]
    hover:scale-101 hover:shadow-sp">
      <h2>{{ event.title }}</h2>
      <span>{{ event.organizer.name }}</span>
      <span>@{{ event.category }} @ {{ event.location }}</span>
    </div>
  </routerLink>
</template>