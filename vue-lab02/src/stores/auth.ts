import { defineStore } from 'pinia'
import apiClient from '@/service/AxiosClient'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    login(email: string, password: string) {
      return apiClient.post('/api/v1/auth/authenticate', { 
        username: email,
        password: password
      })
      .then(response => {
        this.token = response.data.access_token
        localStorage.setItem('access_token', this.token as string)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return response
      })
      .catch(error => {
        console.error('Authentication error:', error)
        throw error
      })
    }
  }
})
