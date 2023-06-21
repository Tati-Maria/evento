import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";

export interface EventParams {
    userId?: string;
    category: string;
    date: string;
    location: string;
    title: string;
}

export async function getEvents(params: EventParams) {
    const { userId, category, date, location, title } = params;
    let query: any = {};

    try {
        if (userId) {
            query.organizerId = userId;
        }
        if (category) {
            query.category = category;
        }

        if (date) {
            //get events that will happen on a date for example: see events that will happen between 2023-06-20 and 2023-06-25
            query.NOT = {
                date: {
                    some: {
                        OR: [
                            {
                                gte: new Date(date),
                            },
                            {
                                lte: new Date(date),
                            }
                        ],
                    }
                }
            }
        }

        if (location) {
            query.location = location;
        }

        if (title) {
            query.title = title;
        }

        const events = await prisma.event.findMany({
            where: query,
            orderBy: {
                date: 'asc'
            },
            include: {
                attendees: true,
            }
        });

        const serializedEvents = events.map(event => ({
            ...event,
            createdAt: event.createdAt.toISOString(),
            updatedAt: event.updatedAt.toISOString(),
            attendees: event.attendees.map(attendee => ({
                ...attendee,
            })),
        }));

        return serializedEvents;

    } catch (error: any) {
        console.log(error.message);
    }
}


