import type { EventState, Event, Participant } from '@/types'
import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
    state: (): EventState => ({
        events: [],
        currentEvent: null
    }),
    getters: {
        getEventById: (state) => (id: number) => {
            return state.events.find(event => event.id === id) || null
        },
        getEventsByOrganizer: (state) => (organizerId: number) => {
            return state.events.filter(event => event.organizer.id === organizerId)
        },
        getEventsWithParticipant: (state) => (participantId: number) => {
            return state.events.filter(event => 
                event.participants.some(participant => participant.id === participantId)
            )
        }
    },
    actions: {
        setCurrentEvent(event: Event | null): void {
            this.currentEvent = event
        },
        addEvent(event: Event): void {
            this.events.push(event)
        },
        updateEvent(updatedEvent: Event): void {
            const index = this.events.findIndex(e => e.id === updatedEvent.id)
            if (index !== -1) {
                this.events[index] = updatedEvent
            }
        },
        deleteEvent(eventId: number): void {
            this.events = this.events.filter(event => event.id !== eventId)
        },
        addParticipantToEvent(eventId: number, participant: Participant): void {
            const event = this.events.find(e => e.id === eventId)
            if (event) {
                if (!event.participants.some(p => p.id === participant.id)) {
                    event.participants.push(participant)
                }
            }
        },
        removeParticipantFromEvent(eventId: number, participantId: number): void {
            const event = this.events.find(e => e.id === eventId)
            if (event) {
                event.participants = event.participants.filter(p => p.id !== participantId)
            }
        }
    }
})