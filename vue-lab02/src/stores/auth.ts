import { defineStore } from 'pinia'
import type { User } from '@/types'
import apiClient from '@/service/AxiosClient'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
  }),
  getters: {
    currentUserName(): string {
      return this.user?.name || ''
    },

    isAdmin(): boolean {
      return this.user?.roles?.includes('ROLE_ADMIN') || false
    },
    authorizationHeader(): string {
      return `Bearer ${this.token}`
    }
  },
  actions: {
    login(email: string, password: string) {
      return apiClient.post('/api/v1/auth/authenticate', { 
        username: email,
        password: password
      })
      .then(response => {
        this.token = response.data.access_token
        this.user = response.data.user
        localStorage.setItem('access_token', this.token as string)
        localStorage.setItem('user', JSON.stringify(this.user))
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return response
      })
      .catch(error => {
        console.error('Authentication error:', error)
        throw error
      })
    },

    logout() {
      console.log('Logout')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    },

    reload(token: string, user: User) {
      this.token = token
      this.user = user
    }
  }
})
