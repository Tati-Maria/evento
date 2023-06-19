// Purpose: Displays the attendees of an event.
// Related to:
// - app\events\[eventId]\page.tsx
import React from "react";
import Image from "next/image";

type Attendees = {
  attendees: string[];
};

const EventAttendees = () => {
  return (
    <div className="avatar-group -space-x-6  py-2">
      <div className="avatar border-transparent">
        <div className="w-10">
          <Image src={"/60.jpg"} alt="a person" width={50} height={50} />
        </div>
      </div>
      <div className="avatar border-transparent">
        <div className="w-10">
          <Image
            src={"/MayaJacobs.jpg"}
            alt="a person"
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className="avatar border-transparent">
        <div className="w-10">
          <Image src={"/63.jpg"} alt="a person" width={50} height={50} />
        </div>
      </div>
      <div className="avatar border-transparent">
        <div className="w-10">
          <Image src={"/smas.jpg"} alt="a person" width={50} height={50} />
        </div>
      </div>
    </div>
  );
};

export default EventAttendees;
