// Purpose: Displays the attendees of an event.
// Related to:
// - app\events\[eventId]\page.tsx
import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"

type Attendees = {
    attendees: string[]
}

const EventAttendees: React.FC<Attendees> = ({attendees}) => {
  return (
    <div></div>
  )
}

export default EventAttendees