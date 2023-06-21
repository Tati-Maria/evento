import Link from "next/link";
import Image from "next/image";
import { assignCategoryColor } from "@/helpers/assign-category-color";
import { FaShareAlt, FaRegClock } from "react-icons/fa";
import { format } from "date-fns";
import { IoLocationSharp } from "react-icons/io5";
import { SafeAttendee } from "@/types";

interface EventCardProps {
  image: string | null;
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  id,
  title,
  date,
  time,
  location,
}) => {

  /* To show if an event has passed or not
  I added additionl styles to the event card if it has passed
   */
  const today = new Date();
  const eventDate = new Date(date);
  const isToday = today.toDateString() === eventDate.toDateString();
  const isPast = today > eventDate;

  return (
    <article 
    className={`
    border border-gray-200 rounded-md overflow-hidden hover:shadow transition-shadow ${isPast ? "opacity-50 hover:shadow-none pointer-events-none" : ""}
    `}
    >
      <Link className="block space-y-4 group overflow-hidden" href={`/events/${id}`}>
        <figure className="relative h-48 bg-center bg-cover">
          <Image
            src={image || "/image/placeholder"}
            alt={title}
            width={400}
            height={400}
            className="object-cover object-center w-full h-full group:hover:scale-105 transition duration-300 ease-in-out"
          />
        </figure>
        <div
        className="flex flex-col space-y-2 px-4 py-2"
        >
          <h3 className="font-semibold text-lg text-gray-950 group:hover:text-orange-500">
            {title}
          </h3>
          <div className="space-y-2 text-xs">
            <span className="flex font-light">
              <FaRegClock className=" mr-2" size={15} />
              {isToday ? "Today" : isPast ? "Passed" : format(new Date(date), "MMMM dd, yyyy")} at {time}
            </span>
            <span className="flex">
              <IoLocationSharp className="mr-2 text-orange-500" size={15} />
              {location}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default EventCard;
