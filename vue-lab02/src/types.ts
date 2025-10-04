export interface Organizer {
  id: number;
  name: string;
  ownEvents?: Event[];
  images: string[];
  roles?: string[];
}

export interface User {
  id: number;
  name: string;
  email?: string;
  roles: string[];
}

export interface Participant {
  id: number;
  name: string;
  telNo: string;
  eventHistory?: Event[];
}

export interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petAllowed: boolean;
  organizer: Organizer;
  participants: Participant;
  images: string[];
}

export interface MessageState {
  messages: string;
}

export interface EventState {
  events: Event[];
  currentEvent: Event | null;
}

export interface OrganizerState {
  organizers: Organizer[];
  currentOrganizer: Organizer | null;
}

export interface ParticipantState {
  participants: Participant[];
  currentParticipant: Participant | null;
}