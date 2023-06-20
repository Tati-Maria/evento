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
        className="object-cover object-center" 
        src={image || "/image/placeholder"} alt="event image"
        height={500}
        width={500}
        />
    </div>
  )
}

export default EventHeader