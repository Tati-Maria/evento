import Link from "next/link";

const EventsPage = () => {
  return (
    <section
    >
      <h1>Events Page</h1>
      <Link href="/events/new">
        Create a new event
      </Link>
    </section>
  )
}

export default EventsPage;