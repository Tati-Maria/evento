import prisma from "@/lib/prisma";

export const getUserEvents = async (userId: string) => {
  const events = await prisma.event.findMany({
    where: {
        organizerId: {
            equals: userId
        }
    },
    include: {
      attendees: true,
    },
  });

 const eventsWithAttendees = events.map((event) => ({
    ...event,
    date: event.date.toISOString(),
    attendees: event.attendees.map((attendee) => ({
        ...attendee,
    })),
 }));

    return eventsWithAttendees;
};
