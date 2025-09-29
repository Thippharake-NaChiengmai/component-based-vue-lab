import type { OrganizerState, Organizer, Event } from '@/types'
import { defineStore } from 'pinia'

export const useOrganizerStore = defineStore('organizer', {
    state: (): OrganizerState => ({
        organizers: [],
        currentOrganizer: null
    }),
    getters: {
        getOrganizerById: (state) => (id: number) => {
            return state.organizers.find(organizer => organizer.id === id) || null
        },
        getOrganizerEvents: (state) => (organizerId: number) => {
            const organizer = state.organizers.find(o => o.id === organizerId)
            return organizer?.ownEvents || []
        }
    },
    actions: {
        setCurrentOrganizer(organizer: Organizer | null): void {
            this.currentOrganizer = organizer
        },
        addOrganizer(organizer: Organizer): void {
            if (!this.organizers.some(o => o.id === organizer.id)) {
                this.organizers.push(organizer)
            }
        },
        updateOrganizer(updatedOrganizer: Organizer): void {
            const index = this.organizers.findIndex(o => o.id === updatedOrganizer.id)
            if (index !== -1) {
                this.organizers[index] = updatedOrganizer
            }
        },
        deleteOrganizer(organizerId: number): void {
            this.organizers = this.organizers.filter(o => o.id !== organizerId)
        },
        addEventToOrganizer(organizerId: number, event: Event): void {
            const organizer = this.organizers.find(o => o.id === organizerId)
            if (organizer) {
                if (!organizer.ownEvents) {
                    organizer.ownEvents = []
                }
                if (!organizer.ownEvents.some(e => e.id === event.id)) {
                    organizer.ownEvents.push(event)
                }
            }
        },
        removeEventFromOrganizer(organizerId: number, eventId: number): void {
            const organizer = this.organizers.find(o => o.id === organizerId)
            if (organizer?.ownEvents) {
                organizer.ownEvents = organizer.ownEvents.filter(e => e.id !== eventId)
            }
        }
    }
})
