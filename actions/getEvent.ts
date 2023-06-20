import prisma from "@/lib/prisma";

interface EventParams {
    eventId: string;
}

export async function getEvent(params: EventParams) {
    try {
        const { eventId } = params;
        const event = await prisma.event.findUnique({
            where: {
                id: eventId,
            },
            include: {
                attendees: true,
                comments: true
            }
        });

        if (!event) {
            throw new Error('Event not found');
        }

        return {
            ...event,
            date: event.date.toISOString(),
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}