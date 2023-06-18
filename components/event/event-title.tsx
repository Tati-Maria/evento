import { format } from "date-fns"
import Title from "../ui/title"
import {BsTwitter, BsFacebook, BsLinkedin, BsWechat} from "react-icons/bs"

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
    <article className="flex justify-between py-6">
        <div className="flex flex-col space-y-4">
            <span className="text-rose-500 text-sm">
                {format(new Date(date), "MMMM dd, yyyy")} | {time}
            </span>
            <Title
            title={title} 
            className="text-xl font-bold"
            />
        </div>
        <div className="flex flex-col space-y-2 text-gray-500">
            <div className="flex items-center space-x-2 ">
                <span className="font-bold text-sm">Share</span>
                <div className="flex items-center space-x-2">
                    <BsFacebook />
                    <BsTwitter />
                    <BsLinkedin />
                    <BsWechat />
                </div>
            </div>
            <span className="border border-gray-300 px-2 py-1">
                <span className="font-bold text-sm">Add to Calendar</span>
            </span>
        </div>
    </article>
  )
}

export default EventTitle