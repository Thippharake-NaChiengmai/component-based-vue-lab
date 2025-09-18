<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  class?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
}>()

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
}
</script>

<template>
  <label class="block">
    <span v-if="label" class="block text-sm text-gray-600 mb-1">{{ label }}</span>
    <input
      :type="type || 'text'"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder || label || ''"
      class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  </label>
  
</template>

<style scoped>
</style>


