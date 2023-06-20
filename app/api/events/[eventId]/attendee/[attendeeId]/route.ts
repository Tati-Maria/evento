import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function PATCH(request: Request, {params}: {params: {eventId: string, attendeeId: string}}) {
    const {userId} = auth();
    const json = await request.json();

    if (!userId) {
        return NextResponse.json({
            error: "You must be logged in to update an attendee.",
        }, {
            status: 401,
        });
    }

    try {
        const updateAttendee = await prisma.attendee.update({
            where: {
                id: params.attendeeId,
            },
            data: {
                ...json,
                event: {
                    connect: {
                        id: params.eventId,
                    }
                },
                userId,
            }
        });

        return NextResponse.json(updateAttendee)
    } catch (error) {
        return NextResponse.json({
            error: "Unable to update attendee.",
        }, {
            status: 500,
        });
    }
}


export async function DELETE(request: Request, {params}: {params: {eventId: string, attendeeId: string}}) {
    const {userId} = auth();

    if (!userId) {
        return NextResponse.json({
            error: "You must be logged in to delete an attendee.",
        }, {
            status: 401,
        });
    }

    try {
        const deleteAttendee = await prisma.attendee.delete({
            where: {
                id: params.attendeeId,
            },
        });

        return NextResponse.json(deleteAttendee)
    } catch (error) {
        return NextResponse.json({
            error: "Unable to delete attendee.",
        }, {
            status: 500,
        });
    }
}