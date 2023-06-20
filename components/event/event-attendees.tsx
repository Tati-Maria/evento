// Purpose: Displays the attendees of an event.
// Related to:
// - app\events\[eventId]\page.tsx
import React from "react";
import Image from "next/image";
import { User } from "@clerk/nextjs/dist/types/server";

type Attendees = {
  attendees: (User | undefined)[];
};

const EventAttendees = ({
  attendees,
}: Attendees) => {
  return (
    <>
    {attendees.length === 0 &&  (
      <div className="text-start text-neutral-500 py-4">
        <span>No attendees yet</span>
      </div>
    )}
    {attendees.length > 0 && (
      <div className="avatar-group -space-x-6  py-2">
        {attendees.map((attendee) => (
          <div 
          key={attendee?.id}
          className="avatar border-transparent">
            <div className="w-10">
              <Image
                src={attendee?.profileImageUrl || "/60.jpg"}
                alt="a person"
                width={50}
                height={50}
              />
            </div>
          </div>
        ))}
      </div>
    )}
    
    </>
  );
};

export default EventAttendees;

