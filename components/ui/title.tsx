import { twMerge } from "tailwind-merge"

interface Props {
    title: string
    className?: string
}

const Title = ({
    title,
    className
}: Props) => {
  return (
    <h1
    className={twMerge(`
    text-3xl
    `, className)}
    >
        {title}
    </h1>
  )
}

export default Title