
import EventForm from "@/components/sections/event-form"
import TextView from "@/components/ui/textview"
import Title from "@/components/ui/title"



const NewEvent = () => {
   
  return (
    <section
    className="min-h-screen flex flex-col space-y-4 py-12 px-4"
    >
        <Title title="New Event" className="text-xl font-bold" />
        <TextView
        text="Create a new event making sure to fill in all the fields." 
        className="mb-6"
        />
        <EventForm />
    </section>
  )
}

export default NewEvent