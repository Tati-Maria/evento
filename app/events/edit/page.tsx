"use client";
import {useParams} from "next/navigation"

const EditEvent = () => {
    const {eventId} = useParams();

    console.log(eventId);

  return (
    <section>

    </section>
  )
}

export default EditEvent