import GridContainer from "@/components/dashboard/grid-container"
import Heading from "@/components/ui/heading"
import { getUserEvents } from "@/actions/getUserEvents"


const Dashboard = async () => {
  const events = await getUserEvents();

  return (
    <section
    aria-label='Dashboard Page'
    className="py-10"
    >
      <Heading
      title='Dashboard'
      subText="Manage your events and RSVP's here" 
      />
      {events.length === 0 && <p>You have no events</p>}
      <GridContainer>
        {/* Events */}
        {/* RSVPs */}
        {/* Profile */}
        {/* Recent Comments */}
      </GridContainer>
    </section>
  )
}

export default Dashboard