import { getEvent } from "@/actions/getEvent";
import { SafeEvent } from "@/types";
import { getUser } from "@/actions/getUser";
import EventHeader from "@/components/event/event-header";
import EventTitle from "@/components/event/event-title";
import EventAttendees from "@/components/event/event-attendees";
import Heading from "@/components/ui/heading";
import TextView from "@/components/ui/textview";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface EventDetailProps {
  eventId: string;
}

const EventDetail = async ({ params }: { params: EventDetailProps }) => {
  const event = await getEvent(params);
  const user = await getUser(event.organizerId);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 md:max-8 py-10">
      <div>
        <EventHeader image={event.image} />
      </div>
      <div>
        <EventTitle title={event.title} date={event.date} time={event.time} />
        {/* **TODO** */}
        <EventAttendees />
        <div className="flex flex-col space-y-4">
          <TextView text={event.description} />
          <TextView text={event.location} />
          <div className="">
            <h3 className="text-xl font-bold mb-2">Organizer</h3>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>
                  {(user.firstName?.[0] ?? "?") + (user.lastName?.[0] ?? "?")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">
                  {user.firstName} {user.lastName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* RSVP */}
      {/* Comments */}
    </section>
  );
};

export default EventDetail;
