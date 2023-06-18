import ClientOnly from "@/components/sections/client-only";
import EmptyState from "@/components/sections/empty-state";
import { EventParams, getEvents } from "@/actions/getEvents";
import Heading from "@/components/ui/heading";
import Categories from "@/components/sections/categories";
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
    className="my-10 mx-4 md:mx-8"
    >
      <Heading 
      title="Events"
      subText="Find events from all over the world. You can also create your own events and share them with your friends."
      />
      <ClientOnly>
        <Categories />
      </ClientOnly>
      <EventList events={events} />
    </section>
  )
}

export default EventsPage;