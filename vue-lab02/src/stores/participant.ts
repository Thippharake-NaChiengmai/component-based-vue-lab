import type { Participant, ParticipantState } from '@/types'
import { defineStore } from 'pinia'

export const useParticipantStore = defineStore('participant', {
    state: (): ParticipantState => ({
        participants: [],
        currentParticipant: null
    }),
    getters: {
        getParticipantById: (state) => (id: number) => {
            return state.participants.find(participant => participant.id === id) || null
        },
        getParticipantsByEvent: (state) => (eventId: number) => {
            // This would typically be filtered through the event store
            return []
        }
    },
    actions: {
        setCurrentParticipant(participant: Participant | null): void {
            this.currentParticipant = participant
        },
        addParticipant(participant: Participant): void {
            if (!this.participants.some(p => p.id === participant.id)) {
                this.participants.push(participant)
            }
        },
        updateParticipant(updatedParticipant: Participant): void {
            const index = this.participants.findIndex(p => p.id === updatedParticipant.id)
            if (index !== -1) {
                this.participants[index] = updatedParticipant
            }
        },
        deleteParticipant(participantId: number): void {
            this.participants = this.participants.filter(p => p.id !== participantId)
        },
        registerForEvent(eventId: number, participant: Participant): void {
            // This would typically be handled by the event store
            this.addParticipant(participant)
        },
        unregisterFromEvent(eventId: number, participantId: number): void {
            // This would typically be handled by the event store
        }
    }
})
