import GridContainer from "@/components/dashboard/grid-container";
import Heading from "@/components/ui/heading";
import { auth } from "@clerk/nextjs";
import { getUserEvents } from "@/actions/getUserEvents";
import { getUsers } from "@/actions/getUser";
import Event from "@/components/dashboard/event";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import RemoveAttendance from "@/components/action-components/remove-attendace";

const Dashboard = async () => {
  const events = await getUserEvents();
  const users = await getUsers();
  const { userId } = auth();
  // get the rsvp's for each event and add the user to the event
  const eventsWithRsvps = events.map(event => {
    const rsvps = event.attendees
      .filter(attendee => attendee.rsvpStatus === "GOING")
      .map(attendee => {
        return users.find(user => user.id === attendee.userId);
      });
    return {
      ...event,
      rsvps,
    };
  });

  // events that the user is attending
  const eventsAttending = events.filter(event => {
    return event.attendees.some(attendee => attendee.userId === userId);
  });

  return (
    <section aria-label="Dashboard Page" className="py-10 px-4 md:px-0">
      <article className="flex items-center justify-between">
        <Heading
          title="Dashboard"
          subText="Manage your events and RSVP's here"
        />
        <Link
          className="btn-special px-4 py-2  font-medium text-white rounded-md shadow-md visited:opacity-90"
          href="/events/new"
        >
          Create an Event
        </Link>
      </article>
      <GridContainer className="bg-neutral-100 p-2 md:grid-cols-2">
        {/* Events */}
        <div className="col-span-2 md:col-span-1 shadow-sm rounded-md p-4 bg-white">
          <h3 className="text-xl font-medium mb-4">Events</h3>
          <ul className="space-y-4 h-64 overflow-y-scroll">
            {events.length === 0 && (
              <p className="text-gray-500 text-center">You have no events</p>
            )}
            {events.map(event => (
              <Event
                title={event.title}
                key={event.id}
                id={event.id}
                location={event.location}
                date={event.date}
                time={event.time}
                image={event.image}
              />
            ))}
          </ul>
        </div>
        {/* RSVPs */}
        <div className="col-span-2 md:col-span-1 shadow-sm rounded-md p-4 bg-white">
          <h3 className="text-xl font-medium mb-4">RSVPs</h3>
          <ul className="space-y-4 h-64 overflow-y-scroll">
            {eventsWithRsvps.length === 0 && (
              <p className="text-gray-500 text-center">You have no RSVPs</p>
            )}
            {eventsWithRsvps.map(event => (
              <div 
              className="flex flex-col space-y-2 border-b pb-2 last:border-b-0"
              key={event.id}>
                <h4>
                  {event.title} - {event.rsvps.length}{" "}
                  {event.rsvps.length === 1 ? "person" : "people"} going
                </h4>
                <ul className="flex space-x-2">
                  {event.rsvps.map(user => (
                    <li 
                    key={user?.id}>
                      <Avatar>
                        <AvatarImage
                          src={user?.profileImageUrl}
                          alt={user?.firstName || "User"}
                        />
                        <AvatarFallback>
                          {user?.firstName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
        {/* Profile */}
        {/* Recent Comments */}
        <div className="col-span-2 md:col-span-1 shadow-sm rounded-md p-4 bg-white">
          <h3 className="text-xl font-medium mb-4">Recent Comments</h3>
          <ul className="space-y-4 h-64 overflow-y-scroll">
            {/* {comments.length === 0 && (
              <p className="text-gray-500 text-center">
                You have no comments
              </p>
            )} */}
          </ul>
        </div>
        {/* Events you will atttend */}
        <div className="col-span-2 md:col-span-1 shadow-sm rounded-md p-4 bg-white">
          <h3 className="text-xl font-medium mb-4">Events you will attend</h3>
          <ul className="space-y-4 h-64 overflow-y-scroll">
            {eventsAttending.length === 0 && (
              <p className="text-gray-500 text-center">
                You have no events to attend
              </p>
            )}
            {eventsAttending.map(event => (
              <li key={event.id}>
                <Link href={`/events/${event.id}`}>
                  <h4>
                    {event.title} - {format(new Date(event.date), "MM/dd/yyyy")}{" "}
                    - {event.time}
                  </h4>
                </Link>
                <RemoveAttendance
                  attendeeId={
                    event.attendees.find(attendee => attendee.userId === userId)
                      ?.id
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </GridContainer>
    </section>
  );
};

export default Dashboard;
