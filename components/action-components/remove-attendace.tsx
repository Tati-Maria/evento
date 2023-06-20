import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import {Button } from "../ui/button";
import { revalidatePath } from "next/cache";

type RemoveAttendanceProps = {
    attendeeId: string | undefined;
}

const RemoveAttendance = ({ attendeeId }: RemoveAttendanceProps) => {
    async function removeAttendance() {
        "use server";
        const {userId} = auth();
        if (!userId) {
            throw new Error("You must be signed in to remove an attendance");
        }

        const attendance = await prisma.attendee.delete({
            where: {
                id: attendeeId,
            }
        });

        if(attendance.userId !== userId) {
            throw new Error("You do not have permission to remove this attendance");
        }

        revalidatePath("/dashboard");
    }

    return (
        <form 
        action={removeAttendance}
        className="text-right"
        >
            <Button
            type="submit"
            title="Remove Attendance"
            variant={"ghost"}
            className="text-red-500 hover:text-red-600 text-sm"
            >
                Remove Attendance
            </Button>
        </form>
    )
}

export default RemoveAttendance;