'use client'
import { Calendar } from "../ui/calendar";

interface Props {
    date: string;
}


const CalendarSection = ({date}: Props) => {
    return (
        <section
        className="hidden md:block md:w-1/4 "
        >
            <Calendar
            mode="single"
            selected={new Date(date)}
            onSelect={() => {}}
            className="rounded-md border w-full" 
            />
        </section>
    )
}

export default CalendarSection;