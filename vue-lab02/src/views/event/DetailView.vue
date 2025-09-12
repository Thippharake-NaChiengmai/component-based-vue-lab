<script setup lang="ts">
import { toRefs, defineProps } from 'vue';
import { type Event } from '@/types';

const props = defineProps<{
  event: Event;
  id?: string | number;
}>();
const { event } = toRefs(props);
</script>
<template>
    <p>{{ event.time }} on {{ event.date }}</p>
    <p>{{ event.description }}</p>
</template>