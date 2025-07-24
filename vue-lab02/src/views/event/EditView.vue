<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import { type Event } from '@/types';

const props = defineProps<{
  event: Event
}>();
const { event } = toRefs(props);

const router = useRouter();
const store = useMessageStore();

function handleEditDone() {
  store.updateMessages('Event updated successfully: ' + props.event.title);
  setTimeout(() => {
   store.resetMessages();
 }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } });
}
</script>

<template>
  <div>
    <p>Edit event here</p>
    <button @click="handleEditDone">Update Event</button>
  </div>
</template>
