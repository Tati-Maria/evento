import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";


export async function GET(request: Request, {params}: {params: {eventId: string}}) {
  const id = params.eventId;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      {
        error: "Invalid event ID",
      },
      {
        status: 400,
      }
    );
  }

  const event = await prisma.event.findUnique({
    where: {
      id,
    }
  });

  if (!event) {
    return NextResponse.json(
      {
        error: "Event not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(event);
}

export async function PATCH(request: Request, {params}: {params: {eventId: string}}) {
  const { userId } = auth();
  const id = params.eventId;
  const json = await request.json();

  if (!userId) return NextResponse.redirect("/sign-in");

  try {
    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        ...json,
        organizerId: userId,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error: any) {
    console.log(error.message);
  }
}

// The deleteMany method is used to delete multiple records that match a query. In this case, we are deleting the event with the ID that 
// matches the eventId parameter and the organizerId that matches the userId. This ensures that only the event organizer can delete the event.

export async function DELETE(
  request: Request,
  { params }: { params: { eventId: string }}
) {
  const { eventId } = params;

  const { userId } = auth();

  if (!userId) return NextResponse.redirect("/sign-in");

  if (!eventId || typeof eventId !== "string") {
    return NextResponse.json(
      {
        error: "Invalid event ID",
      },
      {
        status: 400,
      }
    );
  }

  const event = await prisma.event.deleteMany({
    where: {
      id: eventId,
      organizerId: userId,
    },
  });

  if (!event) {
    return NextResponse.json(
      {
        error: "Event not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(event);
}
