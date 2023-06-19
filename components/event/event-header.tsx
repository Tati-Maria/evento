import Image from "next/image"

type EventProps = {
    image: string | null
}

const EventHeader: React.FC<EventProps> = ({image}) => {
  return (
    <div
    className="relative"
    >
        <Image
        className="object-cover object-center w-full h-full" 
        src={image || "/image/placeholder"} alt="event image" width={400} height={400} />
        <span
        className="absolute left-0 bottom-0 bg-white text-green-500 font-light py-2 px-4 rounded m-2"
        >
            Free
        </span>
    </div>
  )
}

export default EventHeader