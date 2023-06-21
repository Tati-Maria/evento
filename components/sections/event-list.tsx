import { SafeEvent } from "@/types"
import {format} from "date-fns"
import EventCard from "@/components/event/event-card";

type Props = {
    events: SafeEvent[] | undefined;
}

const EventList: React.FC<Props> = ({
    events
}) => {
    

  return (
    <div 
    className="relative flex flex-col"
    >
        {/* Events */}
        <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4 "
        >
            {events?.map((event) => (
                <EventCard 
                key={event.id}
                id={event.id}
                title={event.title}
                image={event.image}
                date={format(new Date(event.date), "MMMM dd, yyyy")}
                time={event.time}
                location={event.location}
                />
            ))}
        </div>
    </div>
  )
}

export default EventList