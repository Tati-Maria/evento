"use client";
import { IoIosPeople} from "react-icons/io";
import {IoShareSocial, IoPeopleCircleSharp} from "react-icons/io5";
import {LuVenetianMask} from "react-icons/lu";
import CategoryCard from "../ui/category-card";
import {MdOutlineSportsBasketball} from "react-icons/md";
import {BsMic} from "react-icons/bs";
import {BiParty, BiSushi} from "react-icons/bi";
import {FaLaptopCode, FaGamepad, FaSuitcaseRolling} from "react-icons/fa";
import {FcClapperboard, FcConferenceCall, FcMusic} from "react-icons/fc";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        title: "Meetup",
        icon: IoIosPeople
    },
    {
        title: "Party",
        icon: BiParty
    },
    {
        title: "Sport",
        icon: MdOutlineSportsBasketball
    },
    {
        title: "Food",
        icon: BiSushi
    },
    {
        title: "Workshop",
        icon: IoPeopleCircleSharp
    },
    {
        title: "Hackathon",
        icon: FaLaptopCode
    },
    {
        title: "Gaming",
        icon: FaGamepad
    },
    {
        title: "Conference",
        icon: FcConferenceCall
    },
    {
        title: "Social",
        icon: IoShareSocial
    },
    {
        title: "Travel",
        icon: FaSuitcaseRolling
    },
    {
        title: "Entertainment",
        icon: FcClapperboard
    },
    {
        title: "Seminar",
        icon: BsMic
    },
    {
        title: "Festival",
        icon: LuVenetianMask
    },
    {
        title: "Other",
        icon: FcMusic
    }
]

const Categories: React.FC = () => {
    const params = useSearchParams();
    const selectedCategory = params?.get("category");
    const pathName = usePathname();

    const isEventPage = pathName === "/events";
    if(!isEventPage) {
        return null;
    }


    return (
        <ul
        id="categories"
        className="pt-4 flex items-center justify-between overflow-x-auto pb-10"
        >
            {categories.map((category, index) => (
                <CategoryCard
                key={index}
                title={category.title}
                icon={category.icon}
                selected={selectedCategory === category.title} 
                />
            ))}
        </ul>
    )
}

export default Categories;