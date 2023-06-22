import Image from "next/image"
import { ImCalendar } from "react-icons/im";

type EventProps = {
    image: string | null
}

const EventHeader: React.FC<EventProps> = ({image}) => {
  return (
    <div
    className="relative"
    >
      {image ? (
        <Image
        alt="Event Image"
        src={image}
        width={500}
        height={500}
        loading="lazy"
        className=""
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <ImCalendar className="text-gray-300" size={100} />
        </div>
      ) }
    </div>
  )
}

export default EventHeader