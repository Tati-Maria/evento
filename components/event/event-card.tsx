import Link from "next/link";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { format } from "date-fns";
import { IoLocationSharp } from "react-icons/io5";
import { ImCalendar } from "react-icons/im";

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
  const isNextWeek =
    today < eventDate &&
    eventDate < new Date(today.setDate(today.getDate() + 7));
  const isPast = today > eventDate;

  return (
    <article
      className={`
    border border-gray-200 rounded-md overflow-hidden hover:shadow dark:hover:shadow-lg dark:hover:shadow-slate-600 transition-shadow ${
      isPast ? "opacity-50 hover:shadow-none pointer-events-none" : ""
    }
    `}
    >
      <Link
        className="block space-y-4 group overflow-hidden"
        href={`/events/${id}`}
      >
        <figure className="relative h-48 bg-center bg-cover">
          {image ? (
            <Image
              alt={title}
              src={image}
              width={300}
              height={200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ImCalendar className="text-gray-300" size={100} />
            </div>
          )}
        </figure>
        <div className="flex flex-col space-y-2 px-4 py-2">
          <h3 className="font-semibold text-gray-950 dark:text-gray-50">
            {title}
          </h3>
          <div className="space-y-2 text-xs">
            <span className="flex font-light dark:text-gray-200">
              <FaRegClock className=" mr-2" size={15} />
              {isToday
                ? "Today"
                : isNextWeek
                ? "Next Week"
                : format(eventDate, "MMM d, yyyy")
                ? isPast
                  ? "Past"
                  : format(eventDate, "MMM d, yyyy")
                : format(eventDate, "MMM d, yyyy")}{" "}
              at {time}
            </span>
            <span className="flex dark:text-gray-200">
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
