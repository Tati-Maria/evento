import { format } from "date-fns"
import Title from "../ui/title"

type EventTitleProps = {
    title: string
    date: string
    time: string
}

const EventTitle: React.FC<EventTitleProps> = ({
    title,
    date,
    time
}) => {
  return (
    <article className="flex flex-col space-y-2 py-6">
        <div className="flex flex-col space-y-4">
            <span className="text-rose-500 text-sm">
                {format(new Date(date), "MMMM dd, yyyy")} | {time}
            </span>
            <Title
            title={title} 
            className="text-xl font-bold"
            />
        </div>
    </article>
  )
}

export default EventTitle