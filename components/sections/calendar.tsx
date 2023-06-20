'use client'
import { isSameDay } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'


interface Props {
    dates: Date[] | undefined;
}

const calendarStyle = {
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #eee',
    padding: '20px',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    color: '#000',
}


const CalendarSection = ({dates}: Props) => {

    return (
        <section
        className="flex flex-col justify-center items-center"
        >
        <Calendar
        className="rounded-md"
        tileContent={({ date }) =>
            dates?.some((eventDate) => isSameDay(eventDate, date)) ? (
            <div 
            className="bg-pink-500 rounded-full h-2 w-2 mx-auto"
            />
            ) : null
        }
        calendarType='US'
        locale='en-US'
        minDate={new Date()}
        maxDate={new Date(2026, 11, 31)}
      />
      <small>
        Check out the events on the dates marked with a pink dot.
      </small>
        </section>
    )
}

export default CalendarSection;