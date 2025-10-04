<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import { useField, useForm } from 'vee-validate'
import router from '@/router'

const authStore = useAuthStore()
const messageStore = useMessageStore()

const validationSchema = yup.object({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required')
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: ''
  }
})

const { value: username } = useField<string>('username')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.register({
      username: values.username,
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname
    })
    messageStore.updateMessages('Registration successful! Please login.')
    setTimeout(() => {
      messageStore.resetMessages()
      router.push({ name: 'login' })
    }, 2000)
  } catch (error: unknown) {
    console.error('Registration failed:', error)
    const axiosError = error as { response?: { data?: { message?: string } } }
    const errorMessage = axiosError.response?.data?.message || 'Registration failed. Please try again.'
    messageStore.updateMessages(errorMessage)
    setTimeout(() => {
      messageStore.resetMessages()
    }, 3000)
  }
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img 
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" 
        alt="Your Company" 
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <InputText 
            type="text" 
            v-model="username" 
            placeholder="Username" 
            :error="errors['username']"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <InputText 
              type="text" 
              v-model="firstname" 
              placeholder="First name" 
              :error="errors['firstname']"
            />
          </div>

          <div>
            <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <InputText 
              type="text" 
              v-model="lastname" 
              placeholder="Last name" 
              :error="errors['lastname']"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <InputText 
            type="email" 
            v-model="email" 
            placeholder="Email address" 
            :error="errors['email']"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <InputText 
            type="password" 
            v-model="password" 
            placeholder="Password (min 6 characters)" 
            :error="errors['password']"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">
            Confirm Password
          </label>
          <InputText 
            type="password" 
            v-model="confirmPassword" 
            placeholder="Confirm password" 
            :error="errors['confirmPassword']"
          />
        </div>

        <div>
          <button 
            type="submit" 
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign in here
        </router-link>
      </p>
    </div>
  </div>
</template>
