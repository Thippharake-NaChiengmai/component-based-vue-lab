<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StudentService from '@/service/StudentService';

interface Student {
  id: number;
  name: string;
  surname: string;
  gpa: number;
}

const students = ref<Student[]>([]);

onMounted(() => {
  StudentService.getStudents()
    .then(response => {
      students.value = response.data;
    })
    .catch(error => {
      console.error('Failed to load students:', error);
    });
});
</script>

<template>
  <h1 class="text-4xl font-bold text-center mb-8">Student List</h1>
  <div class="flex flex-col gap-6 items-center">
    <div 
     class="border border-gray-300 rounded-lg p-4 w-60 bg-gray-50 shadow-md" v-for="student in students" :key="student.id">
      <h2 class="text-xl font-semibold mb-2">{{ student.name }} {{ student.surname }}</h2>
      <p class="text-gray-700"><strong>GPA:</strong> {{ student.gpa }}</p>
    </div>
  </div>
</template>
