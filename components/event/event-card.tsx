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
  category: string;
  attendees: SafeAttendee[];
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  id,
  title,
  date,
  time,
  location,
  category,
  attendees,
}) => {
  return (
    <article className="p-2">
      <Link className="block space-y-4 group" href={`/events/${id}`}>
        <figure className="relative h-48 bg-center bg-cover overflow-hidden">
          <Image
            src={image || "/image/placeholder"}
            alt={title}
            width={300}
            height={200}
            className="object-cover object-center w-full h-full group:hover:scale-105 transition duration-300 ease-in-out"
          />
          <figcaption className="absolute top-0 left-0 m-2">
            <span
              className={`inline-block px-2 py-1 text-xs capitalize rounded ${assignCategoryColor(
                category
              )}`}
            >
              {category}
            </span>
          </figcaption>
        </figure>
        <h3 className="font-semibold text-lg text-gray-950 group:hover:text-orange-500">
          {title}
        </h3>
        <div className="space-y-2 text-xs">
          <span className="flex font-light">
            <FaRegClock className=" mr-2" size={15} />
            {format(new Date(date), "MMMM dd, yyyy")} | {time}
          </span>
          <span className="flex">
            <IoLocationSharp className="mr-2 text-orange-500" size={15} />
            {location}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Add attendees avatars */}
          </div>
          <div className="p-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
            <FaShareAlt size={10} className=" text-white" />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default EventCard;
