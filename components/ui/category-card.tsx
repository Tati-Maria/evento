'use client'
import { useCallback } from "react";
import { useRouter, useSearchParams, } from "next/navigation";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";
import query from "query-string";

interface Props {
  icon: IconType;
  title: string;
  className?: string;
  selected?: boolean;
}

const CategoryCard: React.FC<Props> = ({ icon: Icon, title, className, selected }) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};
        
        if(params) {
            currentQuery = query.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: title.toLowerCase()
        }

        if((params?.get("category") ?? "").toLocaleLowerCase() === title.toLowerCase()) {
            delete updatedQuery.category;
        }

        const url = query.stringifyUrl({
            url: "/events",
            query: updatedQuery
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);

    }, [params, title, router]);


  return (
    <li 
    onClick={handleClick}
    className={twMerge(`
    flex
    flex-col
    items-center
    justify-center
    gap-2
    p-3
    border-b-2
    hover:border-gray-800
    transition
    cursor-pointer
    ${selected ? "border-gray-800 text-gray-800" : "border-transparent text-neutral-500"}
    `, className)}
    >
      <Icon className="text-2xl" />
      <h3 className="text-xs font-semibold">{title}</h3>
    </li>
  );
};

export default CategoryCard;
