<script setup lang="ts">
import type { Participant } from '@/types'

const modelValue = defineModel<number[]>()

interface BaseCheckboxProps {
  label: string
  options: Participant[]
}

const props = withDefaults(defineProps<BaseCheckboxProps>(), {
  label: '',
  options: () => []
})

function toggleParticipant(participantId: number) {
  if (!modelValue.value) {
    modelValue.value = []
  }
  
  const index = modelValue.value.indexOf(participantId)
  if (index > -1) {
    modelValue.value.splice(index, 1)
  } else {
    modelValue.value.push(participantId)
  }
}

function isChecked(participantId: number): boolean {
  return modelValue.value?.includes(participantId) || false
}
</script>

<template>
  <div class="checkbox-group">
    <label v-if="label" class="block mb-2 font-medium">
      {{ label }}
    </label>
    <div class="space-y-2">
      <div 
        v-for="option in props.options" 
        :key="option.id"
        class="flex items-center gap-2"
      >
        <input
          :id="`participant-${option.id}`"
          type="checkbox"
          :checked="isChecked(option.id)"
          @change="toggleParticipant(option.id)"
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label 
          :for="`participant-${option.id}`"
          class="text-sm text-gray-700 cursor-pointer"
        >
          {{ option.name }} ({{ option.telNo }})
        </label>
      </div>
    </div>
    <div v-if="props.options.length === 0" class="text-sm text-gray-500 italic">
      No participants available
    </div>
  </div>
</template>

<style scoped>
.checkbox-group {
  margin-bottom: 1.5rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}
</style>
