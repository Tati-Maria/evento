import { Event, Attendee } from "@prisma/client";

export type SafeEvent = Omit<Event, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
    
}

export type SafeAttendee = Omit<Attendee, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
}

export type SafeComment = Omit<Comment, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
}

export type EventForm = {
    id: string;
    title: string;
    description: string;
    location: string;
    date: Date;
    time: string;
    image: string | null;
    organizerId: string;
    createdAt: Date;
    updatedAt: Date;
    category: string;
}