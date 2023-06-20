import {RiDeleteBin6Line} from "react-icons/ri";
import { Button } from "../ui/button";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {auth} from "@clerk/nextjs";

type DeleteCommentProps = {
    commentId: string;
}

const DeleteComment = ({ commentId }: DeleteCommentProps) => {
    async function deleteComment() {
        "use server";
        const {userId} = auth();
        if (!userId) {
            throw new Error("You must be signed in to delete a comment");
        }

        const comment = await prisma.comment.delete({
            where: {
                id: commentId,
            }
        });

        if(comment.userId !== userId) {
            throw new Error("You do not have permission to delete this comment");
        }

        revalidatePath("/settings");
    }

    return (
        <form action={deleteComment}>
            <Button
            variant={"ghost"}
            type="submit"
            title="Delete Comment"
            className="text-red-500 hover:bg-red-500 hover:text-white"
            >
                <RiDeleteBin6Line />
            </Button>
        </form>
    )
}

export default DeleteComment;