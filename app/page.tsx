import Hero from "@/components/sections/hero"
import { UserButton, SignOutButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <section>
      <Hero />
    </section>
  )
}
