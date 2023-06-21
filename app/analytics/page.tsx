import GridContainer from "@/components/dashboard/grid-container";
import Title from "@/components/ui/title";
import { MdRsvp } from "react-icons/md";
import {
  BsPeopleFill,
  BsFillTicketFill,
  BsFillCalendar2EventFill,
} from "react-icons/bs";
import { format } from "date-fns";
import React from "react";
import EventRsvpChart from "@/components/event/event-rsvp-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventAtendeesChart } from "@/components/analytics/overview";
import RecentAttendece from "@/components/analytics/recent-attences";
import { getUserEvents } from "@/actions/getUserEvents";
import TextView from "@/components/ui/textview";

const Analytics = async () => {
  const userEvents = await getUserEvents();

  return (
    <section className="flex flex-col  py-20">
      <Title title="Analytics" className="mb-2 font-bold" />
      <TextView 
      text="Some data are placeholders."  
      className="mb-8" />
      <GridContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>RSVPs</CardTitle>
            </CardHeader>
            <CardContent>
              <EventRsvpChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>Events you have created</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                {userEvents.length === 0 && (
                    <div className="text-sm text-gray-500">
                        You have not created any events yet.
                    </div>
                )}
                {userEvents.map(event => (
                  <div key={event.id} className="flex items-center">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">{event.title}</div>
                      <div className="text-xs text-gray-500">
                        {format(new Date(event.date), "PP")}
                      </div>
                    </div>
                    <div className="ml-auto font-medium">
                      {event.attendees.length} attendees
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Events
              </CardTitle>
              <BsFillCalendar2EventFill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 mr-1">+3.48%</span> since last
                month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Atendees
              </CardTitle>
              <BsPeopleFill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userEvents.reduce(
                  (acc, event) => acc + event.attendees.length,
                  0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 mr-1">
                  +
                  {userEvents.reduce(
                    (acc, event) => acc + event.attendees.length,
                    0
                  ) / 100}
                </span>{" "}
                since last
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Tickets
              </CardTitle>
              <BsFillTicketFill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">200</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 mr-1">+5</span> since last
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total RSVPs</CardTitle>
              <MdRsvp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">200</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 mr-1">+5</span> since last
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-1 lg:col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <EventAtendeesChart />
            </CardContent>
          </Card>
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Attendees</CardTitle>
              <CardDescription>You have 5 new attendees</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentAttendece />
            </CardContent>
          </Card>
        </div>
      </GridContainer>
    </section>
  );
};

export default Analytics;
