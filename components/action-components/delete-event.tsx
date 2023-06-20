import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {auth} from "@clerk/nextjs";
import { GoTrashcan } from "react-icons/go";
import { Button } from "../ui/button";


type DeleteEventProps = {
    eventId: string;
}

const DeleteEvent = ({ eventId }: DeleteEventProps) => {
    async function deleteEvent() {
        "use server";
        const {userId} = auth();
        if (!userId) {
            throw new Error("You must be signed in to delete an event");
        }

        const event = await prisma.event.delete({
            where: {
                id: eventId,
            }
        });

        if(event.organizerId !== userId) {
            throw new Error("You do not have permission to delete this event");
        }

        revalidatePath("/api/events");
    }

    return (
        <form action={deleteEvent}>
            <Button
            type="submit"
            title="Delete Event"
            variant={"ghost"}
            className="text-red-500 hover:text-red-600"
            >
                <GoTrashcan size={20} />
            </Button>
        </form>
    )
}

export default DeleteEvent;