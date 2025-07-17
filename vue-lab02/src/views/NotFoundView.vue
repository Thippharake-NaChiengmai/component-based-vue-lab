<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
const props = withDefaults(
    defineProps<{
  resource: string
}>(), {
  resource: 'page'
});
</script>
<template>
  <h1>Oops!</h1>
  <h3>The page you're looking for does not exist.</h3>
  <h3>The {{ resource }} you're looking for does not here.</h3>
  <router-link :to="{ name: 'event-list-view' }">Go back to home</router-link>
</template>
