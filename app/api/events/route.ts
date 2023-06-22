import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs"

export async function GET() {
    const events = await prisma.event.findMany({
        orderBy: {
            title: 'asc'
        }
    });

    return NextResponse.json(JSON.stringify(events));
}

export async function POST(request: Request) {
    const json = await request.json();
    const {userId} = auth();

    if(!userId) {
        return new Response("Unauthorized", {
            status: 401
        })
    }
    
    const event = await prisma.event.create({
        data: {
            ...json,
            organizerId: userId
        }
    });

    return NextResponse.json(JSON.stringify(event), {
        status: 201
    })
}