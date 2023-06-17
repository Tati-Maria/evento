import Image from "next/image"
import Link from "next/link"


const Hero = () => {
  return (
    <section
    aria-label="Hero Section"
    className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center py-20"
    >
        <article
        className="space-y-4 flex flex-col justify-center h-full"
        >
            <h1
            className="text-4xl font-bold"
            >
                Find your <span className="text-purple-500">Mood</span>
            </h1>
            <p
            className="text-gray-500"
            >
                Whether you&#39;re looking for a new hobby or want to meet new people, Mood is the place for you.
                Create or join events with people who share your interests. From coding contests to book clubs, we have it all.
            </p>
            <Link 
            href="/events" 
            className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out w-max"
            >
                Get Started
            </Link>
        </article>
        <figure
        className="relative order-first md:order-last w-full h-full"
        >
            <Image 
            src="/movie.jpg"
            alt="movie"
            width={500}
            height={500}
            priority
            className="rounded-md"
            />
        </figure>
    </section>
  )
}

export default Hero