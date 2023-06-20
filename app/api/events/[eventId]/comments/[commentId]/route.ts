import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function PATCH(request: Request, {params}: {params: {eventId: string, commentId: string}}) {
    const {userId} = auth();
    const json = await request.json();

    if (!userId) {
        return NextResponse.json({
            error: "You must be logged in to update a comment.",
        }, {
            status: 401,
        });
    }

    try {
        const comment = await prisma.comment.update({
            where: {
                id: params.commentId,
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

        return NextResponse.json(comment)
    } catch (error) {
        return NextResponse.json({message: "Unable to update comment."}, {status: 500})
    }
}

export async function DELETE(request: Request, {params}: {params: {eventId: string, commentId: string}}) {
    const {userId} = auth();

    if (!userId) {
        return NextResponse.json({
            error: "You must be logged in to delete a comment.",
        }, {
            status: 401,
        });
    }

    try {
        const deleteComment = await prisma.comment.delete({
            where: {
                id: params.commentId,
            },
        });

        return NextResponse.json(deleteComment)
    } catch (error) {
        return NextResponse.json({
            error: "Unable to delete comment.",
        }, {
            status: 500,
        });
    }
}