import EventForm from "@/components/sections/event-form";
import TextView from "@/components/ui/textview";
import Title from "@/components/ui/title";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const metadata = {
  title: "New Event",
  description: "Create a new event",
};

const NewEvent = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <section className="min-h-screen flex flex-col space-y-4 py-12 px-4">
      <Title title="New Event" className="text-xl font-bold" />
      <TextView
        text="Create a new event making sure to fill in all the fields."
        className="mb-6"
      />
      <EventForm />
    </section>
  );
};

export default NewEvent;
