import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function PATCH(request: Request, {params}: {params: {eventId: string, attendeeId: string}}) {
    const {userId} = auth();
    const json = await request.json();

    if (!userId) return NextResponse.redirect("/sign-in");

    try {
        const updateAttendee = await prisma.attendee.upsert({
            where: {
                id: params.attendeeId,
            },
            update: {
                ...json,
            },
            create: {
                ...json,
                event: {
                    connect: {
                        id: params.eventId,
                    }
                },
                userId
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

    if (!userId) return NextResponse.redirect("/sign-in");

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