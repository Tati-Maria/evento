import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  const { userId } = auth();
  const json = await request.json();

  if (!userId) return NextResponse.redirect("/sign-in");

  // check if the user is already attending the event
  const existingAttendee = await prisma.attendee.findFirst({
    where: {
      userId,
      eventId: params.eventId,
    },
  });

  if (existingAttendee) {
    return new Response("Already attending", {
      status: 400,
    });
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
