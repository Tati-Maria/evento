import GridContainer from "@/components/dashboard/grid-container";
import Heading from "@/components/ui/heading";
import { auth } from "@clerk/nextjs";
import { EventParams, getEvents } from "@/actions/getEvents";
import { getUserEvents } from "@/actions/getUserEvents";
import { getUsers } from "@/actions/getUser";
import Event from "@/components/dashboard/event";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import RemoveAttendance from "@/components/action-components/remove-attendace";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your events and RSVP's here",
}

export const revalidate = 1;

type Props = {
  searchParams: EventParams;
}

const Dashboard = async ({
  searchParams,
}: Props) => {
  const events = await getUserEvents();
  const users = await getUsers();
  const { userId } = auth();
  const allEvents = await getEvents(searchParams);
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
  // get the events the user is attending
 const eventsAttending = allEvents?.filter(event => {
    const attendee = event.attendees.find(attendee => attendee.userId === userId);
    return attendee && attendee.rsvpStatus === "GOING";
 });

 const commentsOnEvents = events.map(event => {
    //get comments text and user
    const comments = event.comments.map(comment => {
      return {
        ...comment,
        user: users.find(user => user.id === comment.userId),
      };
    })

    return {
      ...event,
      comments,
    }
 });

  return (
    <section aria-label="Dashboard Page" className="py-10 px-4 md:px-0">
      <article className="flex flex-col mb-8 gap-4  md:flex-row items-center justify-between">
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
        {/* Recent Comments */}
        <div className="col-span-2 md:col-span-1 shadow-sm rounded-md p-4 bg-white">
          <h3 className="text-xl font-medium mb-4">Recent Comments</h3>
          <ul className="space-y-4 h-64 overflow-y-scroll">
            {commentsOnEvents.map(event => (
              <div 
              className="flex flex-col space-y-2 border-b pb-2 last:border-b-0"
              key={event.id}>
                <h4
                className="font-medium text-pink-400"
                >
                  Comments on {event.title}
                </h4>
                <ul className="flex flex-col space-y-2">
                  {event.comments.length === 0 && (
                    <p className="text-gray-500 text-center">
                      No comments on this event
                    </p>
                  )}
                  {event.comments.map(comment => (
                    <li 
                    key={comment.id}>
                      <Avatar>
                        <AvatarImage
                          src={comment.user?.profileImageUrl}
                          alt={comment.user?.firstName || "User"}
                        />
                        <AvatarFallback>
                          {comment.user?.firstName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-gray-500">{comment.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
        {/* Events you will atttend */}
        <div className="col-span-2 md:col-span-1 shadow-sm rounded-md p-4 bg-white">
          <h3 className="text-xl font-medium mb-4">Events you will attend</h3>
          <ul className="space-y-4 h-64 overflow-y-scroll">
            {eventsAttending?.length === 0 && (
              <p className="text-gray-500 text-center">
                You have no events to attend
              </p>
            )}
            {eventsAttending?.map(event => (
              <li 
              className="flex justify-between items-center border-b pb-2"
              key={event.id}>
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
