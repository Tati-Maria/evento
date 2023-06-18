import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs"


interface EventParams {
    eventId: string;
}

export async function DELETE(request: Request, {params}: {params: EventParams}) {
    const {eventId} = params;

    const {userId} = auth();

    if(!userId) {
        return NextResponse.json({
            error: 'You must be logged in to delete an event'
        }, {
            status: 401
        })
    }

    if(!eventId || typeof eventId !== "string") {
        return NextResponse.json({
            error: 'Invalid event ID'
        }, {
            status: 400
        })
    }

    const event = await prisma.event.deleteMany({
        where: {
            id: eventId,
            organizerId: userId
        }
    });

    if(!event) {
        return NextResponse.json({
            error: 'Event not found'
        }, {
            status: 404
        })
    } 

    return NextResponse.json(event)
}

export async function PATCH() {
    return NextResponse.json({
        error: 'Not implemented'
    }, {
        status: 501
    })
}