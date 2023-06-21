import { format } from "date-fns";
import EditEvent from "../event/event-edit";
import Link from "next/link";
import Image from "next/image";
import DeleteEvent from "../action-components/delete-event";

interface EventProps {
  title: string;
  id: string;
  time: string;
  location: string;
  date: string;
  image?: string | null;
  event: any;
}

const Event = ({ title, id, time, location, date, image, event }: EventProps) => {
  return (
    <li className="bg-white shadow-sm rounded-md p-4 flex flex-col sm:flex-row justify-center items-center sm:justify-between">
      <div className="flex items-center gap-4 flex-col text-center sm:text-start sm:flex-row">
        <Image
          alt={title}
          src={image || "/images/event-default.png"}
          width={120}
          height={120}
          loading="lazy"
          className="rounded-md aspect-auto w-auto h-auto"
        />
        <div>
          <h3 className="text-lg font-medium hover:underline">
            <Link href={`/events/${id}`}>{title}</Link>
          </h3>
          <time className="text-pink-500 text-xs lg:text-sm">
            {format(new Date(date), "MMMM d, yyyy")} at {time}
          </time>
          <address className="text-xs lg:text-sm">{location}</address>
        </div>
      </div>
      {/* actions */}
      <div className="flex items-center space-x-4">
        <DeleteEvent eventId={id} />
        <EditEvent 
        event={event}
         />
      </div>
    </li>
  );
};

export default Event;
