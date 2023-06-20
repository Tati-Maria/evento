import ClientOnly from "@/components/sections/client-only";
import EmptyState from "@/components/sections/empty-state";
import { EventParams, getEvents } from "@/actions/getEvents";
import EventList from "@/components/sections/event-list";

interface Props {
  searchParams: EventParams;
}

const EventsPage = async ({ searchParams }: Props) => {
  const events = await getEvents(searchParams);

  if (events?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <section className="my-10 mx-4 md:mx-8">
      <EventList events={events} />
    </section>
  );
};

export default EventsPage;
