import { twMerge } from "tailwind-merge"

const TextView = ({text, className}: {text: string, className?: string}) => {
  return (
    <p
    className={twMerge(`text-gray-500 dark:text-gray-200`, className)}
    >
        {text}
    </p>
  )
}

export default TextView