import Link from "next/link";
import ClientOnly from "@/components/sections/client-only";
import EmptyState from "@/components/sections/empty-state";
import { EventParams, getEvents } from "@/actions/getEvents";
import Heading from "@/components/ui/heading";
import Categories from "@/components/sections/categories";
import { Calendar } from "@/components/ui/calendar";
import CalendarSection from "@/components/sections/calendar";
import EventList from "@/components/sections/event-list";

interface Props {
  searchParams: EventParams;
}

const EventsPage = async ({searchParams}: Props) => {
  const events = await getEvents(searchParams);

  if(events?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }


  return (
    <section
    className="my-10"
    >
      <Heading 
      title="Events"
      subText="Find events from all over the world. You can also create your own events and share them with your friends."
      />
      <EventList events={events} />
    </section>
  )
}

export default EventsPage;