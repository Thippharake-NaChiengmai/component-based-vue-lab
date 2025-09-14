<script setup lang="ts">
import type { Event } from '@/types'
defineProps<{ event: Event }>()
</script>

<template>
  <div class="text-right">
    <p class="text-sm m-0">{{ event.category }}</p>
    <p class="text-sm m-0">{{ event.organizer }}</p>
  </div>
</template>
