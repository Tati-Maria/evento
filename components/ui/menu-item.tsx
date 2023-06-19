import { IconType } from "react-icons/lib";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface MenuItemProps {
    title: string;
    icon?: IconType;
    href: string;
    className?: string;
}

const MenuItem = ({ title, icon: Icon, href, className }: MenuItemProps) => {
    return (
        <li
        className={twMerge(
            "", 
            className
        )}
        >
            <Link href={href} className="flex gap-4 items-center">
                {!!Icon && <Icon className="w-6 h-6" />}
                <span className="font-medium">{title}</span>
            </Link>
        </li>
    )
}

export default MenuItem;