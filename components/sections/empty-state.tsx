'use client'
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button"
import Heading from "../ui/heading";

interface Props {
    title?: string;
    subTitle?: string;
    showReset?: boolean;
}

const EmptyState = ({
    title = "No events found.",
    subTitle = "Try adjusting your search filters.",
    showReset
}: Props) => {
    const router = useRouter();

    const handleReset = () => {
        router.push("/events");
    }

    return (
        <div
        className="h-[calc(100vh - 4rem)] flex flex-col justify-center items-center gap-4"
        >
            <Heading
            title={title}
            subText={subTitle}
            center 
            />
            {showReset && (
                <div
                className="w-48 mt-4"
                >
                    <Button
                    onClick={handleReset}
                    variant="outline"
                    >
                        Reset Filters
                    </Button>
                </div>
            )}
        </div>
    )
}

export default EmptyState;