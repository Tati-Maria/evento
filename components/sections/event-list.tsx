import { SafeEvent } from "@/types"
import CalendarSection from "./calendar";
import {format} from "date-fns"
import EventCard from "../ui/event-card";

type Props = {
    events: SafeEvent[] | undefined;
}

const EventList: React.FC<Props> = ({
    events
}) => {
    

    // event dates
    const eventDates = events?.map((event) => {
        return new Date(event.date)
    })

  return (
    <div 
    className="relative flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full"
    >
        {/* Events */}
        <div
        className="grid grid-cols-fluid-1 gap-4 flex-grow"
        >
            {events?.map((event) => (
                <EventCard
                key={event.id}
                title={event.title}
                date={format(new Date(event.date), "MMM dd, yyyy")}
                id={event.id}
                attendees={event.attendees}
                location={event.location}
                time={event.time}
                image={event.image}
                category={event.category}
                />
            ))}
        </div>
        {/* Calendar */}
        <CalendarSection
        date={eventDates?.[0].toString() || new Date().toString()}
        />
    </div>
  )
}

export default EventList