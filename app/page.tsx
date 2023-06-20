import Link from "next/link";
import CalendarSection from "@/components/sections/calendar";
import { EventParams, getEvents } from "@/actions/getEvents";
import Title from "@/components/ui/title";
import TextView from "@/components/ui/textview";
import ClientOnly from "@/components/sections/client-only";

interface Props {
  searchParams: EventParams;
}

export default async function Home({ searchParams }: Props) {
  const events = await getEvents(searchParams);
  const eventDates = events?.map(event => new Date(event.date));

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 py-20">
      <div className="space-y-6 py-10">
        <Title title="Welcome to the Evento" className="font-bold" />
        <TextView text="Evento is a platform for creating and managing events. This project was created by Maria to demonstrate her skills in building a fullstack application using Next.js, TypeScript, and Prisma. Plus, learning how to use Clerk for authentication and authorization. Feel free to create an account and create your own events." />
        <Link className="font-medium bg-pink-500 inline-block px-8 py-2 text-white rounded-md shadow hover:bg-pink-600 transition visited:opacity-20" href="/events">
          View Events
        </Link>
      </div>
      <ClientOnly>
        <CalendarSection dates={eventDates} />
      </ClientOnly>
    </section>
  );
}
