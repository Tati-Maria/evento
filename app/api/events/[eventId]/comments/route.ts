import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";



export async function POST(request: Request, {params}: {params: {eventId: string}}) {
    const {userId} = auth();
    const json = await request.json();

    if (!userId) {
        return NextResponse.error()
    }

    const comment = await prisma.comment.create({
        data: {
            ...json,
            userId,
            event: {
                connect: {
                    id: params.eventId
                }
            }
        }
    });

    if(comment.text.trim().length === 0) {
        return NextResponse.error()
    } else if (comment.text.trim().length > 1000) {
        return NextResponse.json({
            message: "Comment must be less than 1000 characters"
        }, {
            status: 400
        })
    } 

    return NextResponse.json(JSON.stringify(comment), {
        status: 201
    })
}