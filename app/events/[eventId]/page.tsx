import { getEvent } from "@/actions/getEvent";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser, getUsers } from "@/actions/getUser";
import { ImLocation } from "react-icons/im";
import EventHeader from "@/components/event/event-header";
import EventTitle from "@/components/event/event-title";
import EventAttendees from "@/components/event/event-attendees";
import TextView from "@/components/ui/textview";
import AddAttendee from "@/components/event/AddAttendee";
import FlexBetween from "@/components/sections/flex-between";
import EventComment from "@/components/event/event-comment";
import AddComent from "@/components/event/add-comment";

export const revalidate = 1;

interface EventDetailProps {
  eventId: string;
}

export async function generateMetadata({ params }: { params: EventDetailProps }) {
  try {
    const event = await getEvent(params);
    if(!event) return {
      title: "Event not found",
      description: "Event not found"
    }
    return {
      title: `${event.title} | Event Detail`,
      description: event.description,
    }
  } catch (error) {
    return {
      title: "Event not found",
      description: "Event not found"
    }
  }
}


const EventDetail = async ({ params }: { params: EventDetailProps }) => {
  const event = await getEvent(params);
  const user = await getUser(event.organizerId);
  const users = await getUsers();

  // Get the user for each attendee that said rsvp yes
  const userAttendees = event.attendees.filter(attendee => attendee.rsvpStatus === "GOING").map(attendee => {
    return users.find(user => user.id === attendee.userId);
  })

  // Get the user for each comment
  const userComments = event.comments.map(comment => {
    return users.find(user => user.id === comment.userId);
  });

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6  py-10 mb-10">
        <div className="flex justify-center items-center">
          <EventHeader image={event.image} />
        </div>
        <div>
          <EventTitle title={event.title} date={event.date} time={event.time} />
          {/* **TODO** */}
          <EventAttendees attendees={userAttendees} />
          <div className="flex flex-col space-y-4">
            <TextView text={event.description} />
            <div className="flex items-center space-x-2">
              <ImLocation className="text-orange-500" size={15} />
              <span>{event.location}</span>
            </div>
            <div className="self-start md:self-end text-neutral-500 text-start md:text-right">
              <h3 className="text-base mb-2 font-bold">Organizer</h3>
              <div className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage
                    src={user.profileImageUrl}
                    alt="Profile Image"
                    />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">
                  {user.firstName} {user.lastName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 space-y-4">
        <AddAttendee eventId={event.id} />
        {/* Comments */}
        <div className="">
        <AddComent eventId={event.id} />
          <FlexBetween>
            <h3>Comments</h3>
            <span>
              {event.comments.length}{" "}
              {event.comments.length === 1 ? "comment" : "comments"}
            </span>
          </FlexBetween>
          {/* <EventComment /> */}
          {event.comments.length === 0 ? (
            <div className="text-center text-neutral-500">
              <span>No comments yet</span>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              {event.comments.map(comment => (
                <EventComment
                  key={comment.id}
                  text={comment.text}
                  userId={comment.userId}
                  commentId={comment.id}
                  createdAt={format(new Date(comment.createdAt), "MMMM dd, yyyy")}
                  userName={
                    comment.userId === user.id
                      ? "You"
                      : `${
                          userComments.find(user => user?.id === comment.userId)
                            ?.firstName
                        } ${
                          userComments.find(user => user?.id === comment.userId)
                            ?.lastName
                        }`
                  }
                  userImage={
                    userComments.find(user => user?.id === comment.userId)
                      ?.profileImageUrl || null
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EventDetail;
