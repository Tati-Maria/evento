import { twMerge } from "tailwind-merge"

type FlexBetweenProps = {
    children: React.ReactNode
    className?: string
}

const FlexBetween = ({
    children,
    className,
}: FlexBetweenProps) => {
  return (
    <div 
    className={twMerge(`
    flex items-center justify-between py-2
    `, className)}
    >
        {children}
    </div>
  )
}

export default FlexBetween