<script setup lang="ts">
const modelValue = defineModel<string | boolean>()

interface BaseInputProps {
    label: string
    type: string
}

withDefaults(defineProps<BaseInputProps>(), {
    label: '',
    type: 'text'
})
</script>

<template>
  <div class="input-wrapper" :class="{ 'checkbox-wrapper': type === 'checkbox' }">
    <label v-if="label && type !== 'checkbox'" class="block mb-1">
      {{ label }}
    </label>
    <div v-if="type === 'checkbox'" class="flex items-center gap-2">
      <input 
        type="checkbox" 
        v-bind="$attrs" 
        v-model="modelValue"
        class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
      />
      <label class="text-sm text-gray-700">{{ label }}</label>
    </div>
    <input 
      v-else
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
      v-bind="$attrs" 
      v-model="modelValue" 
      :type="type"
      :placeholder="label"
    />
  </div>
</template>


