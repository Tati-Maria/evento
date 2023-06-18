// import Hero from "@/components/sections/hero"
import Search from "@/components/ui/search";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between w-full border-b border-gray-200 p-4">
        <Search />
        <Link
        className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white font-semibold py-2 px-4 rounded hover:shadow-lg transition duration-300 ease-in-out" 
        href="/events/new">Create Event</Link>
      </div>
    </section>
  );
}
