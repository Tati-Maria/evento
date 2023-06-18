import { format } from "date-fns";
import Link from "next/link";
import TextView from "./textview";
import { SafeAttendee } from "@/types";
import Image from "next/image";

interface EventCardProps {
  title: string;
  attendees: SafeAttendee[];
  date: string;
  id: string;
  location: string;
  time: string;
  image?: string | null;
  category: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  id,
  location,
  time,
    image,
}) => {
  return (
    <div
    className="bg-secondary rounded-lg p-4 w-full relative"
    >
      <div className="flex space-y-2 flex-col md:flex-row md:space-x-4">
        <div>
            <div 
            className="rounded-lg overflow-hidden hidden relative md:block md:w-48 md:h-48"
            >
                <Image
                src={image || "/mood.svg"} 
                alt="Event Image"
                width={300}
                height={200}
                loading="lazy"
                className="object-cover object-center"
                />
            </div>
        </div>
        <div className="space-y-2 flex flex-col justify-between w-full">
            <h2 className="font-medium">
                {title}
            </h2>
            <div className="text-sm space-y-1">
                <TextView
                text={format(new Date(date), "MMM dd, yyyy")} 
                />
                <TextView
                text={`at ${time}`} 
                />
                <TextView
                text={location} 
                />
            </div>
            <div className="text-xs md:text-sm relative text-end">
                <Link
                className="text-primary font-medium hover:underline" 
                href={`/events/${id}`}>
                    More Details
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
