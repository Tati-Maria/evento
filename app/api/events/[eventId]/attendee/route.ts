import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  const { userId } = auth();
  const json = await request.json();

  if (!userId) {
    return NextResponse.json(
      {
        error: "You must be logged in to register for an event.",
      },
      {
        status: 401,
      }
    );
  }

  const event = await prisma.event.findUnique({
    where: {
      id: params.eventId,
    },
    select: {
      attendees: true,
    }
  });

  if (event?.attendees?.some((attendee) => attendee.userId === userId)) {
    return NextResponse.json(
      {
        message: "You are already registered for this event.",
      },
      {
        status: 400,
      }
    );
  }


  const attendee = await prisma.attendee.create({
    data: {
      userId,
      eventId: params.eventId,
      ...json,
    }
  });

  return NextResponse.json(attendee, {
    status: 201,
  });
}
