import { defineStore } from 'pinia'
import type { Organizer } from '@/types'
import apiClient from '@/service/AxiosClient'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as Organizer | null,
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
    register(data: {
      username: string
      email: string
      password: string
      firstname: string
      lastname: string
    }) {
      return apiClient.post('/api/v1/auth/register', data)
        .then(response => {
          return response
        })
        .catch(error => {
          console.error('Registration error:', error)
          throw error
        })
    },

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

    reload(token: string, user: Organizer) {
      this.token = token
      this.user = user
    }
  }
})
