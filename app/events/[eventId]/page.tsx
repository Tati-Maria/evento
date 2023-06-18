import { getEvent } from "@/actions/getEvent";
import { SafeEvent} from "@/types";
import { getUser } from "@/actions/getUser";
import EventHeader from "@/components/event/event-header";
import EventTitle from "@/components/event/event-title";
import EventAttendees from "@/components/event/event-attendees";
import Heading from "@/components/ui/heading";
import TextView from "@/components/ui/textview";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface EventDetailProps {
    eventId: string
}

const EventDetail = async (
   {params}: {params: EventDetailProps}
) => {
    const event = await getEvent(params);
    const user = await getUser(event.organizerId);

  return (
    <section
    className="flex flex-col space-y-4 my-10 mx-4 md:mx-8"
    >
        <EventHeader image={event.image} />
        <EventTitle
        title={event.title}
        date={event.date}
        time={event.time} 
        />
        {/* **TODO** */}
        {/* <EventAttendees attendees={event.attendees} /> */}
        <div className="flex flex-col">
            <Heading title="About this event" />
            <TextView text={event.description} />
            <TextView text={event.location} />
            <div>
                <h3 className="text-2xl font-bold mb-2">Organizer</h3>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage
                        src={user.imageUrl} 
                        />
                        <AvatarFallback>
                            {(user.firstName?.[0] ?? "?") + (user.lastName?.[0] ?? "?")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">{user.firstName} {user.lastName}</span>
                    </div>
                </div>
            </div>
        </div>
        {/* RSVP */}
        {/* Comments */}
    </section>
  )
}

export default EventDetail