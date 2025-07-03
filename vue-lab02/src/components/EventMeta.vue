<script setup lang="ts">
import type { Event } from '@/types'
defineProps<{ event: Event }>()
</script>

<template>
  <div class="meta">
    <p class="text">{{ event.category }}</p>
    <p class="text">{{ event.organizer }}</p>
  </div>
</template>

<style scoped>
.meta {
  text-align: right;
}
.text {
  font-size: 14px;
  margin: 0;
}
</style>
