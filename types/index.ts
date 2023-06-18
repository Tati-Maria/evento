import { Event, Attendee } from "@prisma/client";

export type SafeEvent = Omit<Event, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
    image: string | null;
    date: Date;
    attendees: SafeAttendee[];
}

export type SafeAttendee = Omit<Attendee, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
    event: SafeEvent;
    id: string;
    userId: string;
    eventId: string;
    rsvpStatus: string;
}