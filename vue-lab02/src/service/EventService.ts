import type { AxiosResponse } from 'axios'
import apiClient from './AxiosClient'
import type { Event } from '@/types'

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: number | string) {
    const eventId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(eventId) || eventId <= 0) {
      return Promise.reject(new Error('Invalid event ID'));
    }
    return apiClient.get(`/events/${eventId}`);
  },
  saveEvent(event: Event) {
    return apiClient.post('/events', event)
  },
  getEventsByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<Event[]>> {
    const encoded = encodeURIComponent(keyword)
    return apiClient.get<Event[]>(`/events?title=${encoded}&_limit=${perPage}&_page=${page}`)
  }
}