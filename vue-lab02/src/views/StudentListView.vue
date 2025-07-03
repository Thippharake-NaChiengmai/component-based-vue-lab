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
  <h1>Student List</h1>
  <div class="student-wrapper">
    <div 
     class="student" v-for="student in students" :key="student.id">
      <h2>{{ student.name }} {{ student.surname }}</h2>
      <p><strong>GPA:</strong> {{ student.gpa }}</p>
    </div>
  </div>
</template>

<style scoped>
.student-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.student {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 240px;
  background-color: #f9f9f9;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
}
</style>
