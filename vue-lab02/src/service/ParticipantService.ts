import axios from 'axios';
import type { Participant } from '@/types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

export default {
  getParticipants() {
    return apiClient.get('/participants');
  },

  getParticipant(id: number) {
    return apiClient.get(`/participants/${id}`);
  },

  createParticipant(participant: Omit<Participant, 'id' | 'eventHistory'>) {
    return apiClient.post('/participants', participant);
  },

  updateParticipant(id: number, participant: Partial<Participant>) {
    return apiClient.put(`/participants/${id}`, participant);
  },

  deleteParticipant(id: number) {
    return apiClient.delete(`/participants/${id}`);
  },

  registerForEvent(eventId: number, participantId: number) {
    return apiClient.post(`/events/${eventId}/participants`, { participantId });
  },

  unregisterFromEvent(eventId: number, participantId: number) {
    return apiClient.delete(`/events/${eventId}/participants/${participantId}`);
  },

  getEventParticipants(eventId: number) {
    return apiClient.get(`/events/${eventId}/participants`);
  }
};
