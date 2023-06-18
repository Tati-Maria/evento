import { IconType } from "react-icons/lib";
import Link from "next/link";

interface MenuItemProps {
    title: string;
    icon: IconType;
    href: string;
}

const MenuItem = ({ title, icon: Icon, href }: MenuItemProps) => {
    return (
        <li
        className="flex px-2 items-center justify-start w-full h-12 text-gray-600 transition-colors duration-200 rounded-lg cursor-pointer hover:bg-yellow-200 hover:text-gray-700"
        >
            <Link href={href} className="flex gap-4 items-center">
                <Icon size={25} />
                <span className="font-medium">{title}</span>
            </Link>
        </li>
    )
}

export default MenuItem;