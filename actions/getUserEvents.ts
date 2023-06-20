import prisma from "@/lib/prisma";
import {auth} from "@clerk/nextjs";

export const getUserEvents = async () => {
  const {userId} = auth();

  if (!userId) {
    return [];
  }

  const events = await prisma.event.findMany({
    where: {
        organizerId: userId || "",
    },
    include: {
      attendees: true,
      comments: true
    },
  });

 const eventsWithAttendees = events.map((event) => ({
    ...event,
    date: event.date.toISOString(),
    attendees: event.attendees.map((attendee) => ({
        ...attendee,
        createdAt: attendee.createdAt.toISOString(),
        updatedAt: attendee.updatedAt.toISOString(),
    })),
    comments: event.comments.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
    })),
 }));

    return eventsWithAttendees;
};
