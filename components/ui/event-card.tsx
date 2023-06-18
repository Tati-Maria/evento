import { format } from "date-fns";
import Link from "next/link";
import { LuVerified } from "react-icons/lu";
import { BsFillPinMapFill } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
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
  attendees,
  date,
  id,
  location,
  time,
  image,
  category,
}) => {
  return (
    <div className="relative p-4 flex flex-col h-96 justify-between">
      <Image
        src={image || "/images/placeholder.png"}
        alt={`${title} image`}
        width={400}
        height={300}
        priority
        className="absolute top-0 left-0 w-full h-full rounded-md z-0 "
      />
      <div className="relative z-10 flex justify-between">
        <div className="bg-white text-gray-950 rounded-md p-2 capitalize">
          <span>{category}</span>
        </div>
        <div className="bg-white rounded-md p-2 text-center">
            <LuVerified className="text-teal-400" size={20} />
        </div>
      </div>
      <div className="bg-white rounded-md shadow p-4 relative z-10 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 hover:text-gray-700">
            <Link href={`/events/${id}`}>{title}</Link>
          </h2>
          <h3 className="text-gray-500">By John Doe</h3>
          <span className="text-gray-500 text-sm inline-block">
            {format(new Date(date), "MMM dd, yyyy")}
          </span>
        </div>
        {/* Location */}
        <div className="text-sm flex items-center text-gray-500 gap-3 border-b border-gray-200 pb-2 my-2">
          <BsFillPinMapFill className="text-teal-400" />
          <span>{location}</span>-<span>{time}</span>
        </div>
        {/* Attentees */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <IoIosPeople className="text-gray-500" size={24} />
            <span>{attendees.length} attendees</span>
          </div>
          <div>
            <Link
            className="text-blue-500 hover:text-blue-600" 
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
