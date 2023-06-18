import { Metadata } from "next";
import ClientOnly from "@/components/sections/client-only";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Lato, Montserrat } from "next/font/google";
import Navbar from "@/components/nav/navbar";
import Provider from "@/providers/provider";
import Search from "@/components/ui/search";
import Link from "next/link";

const inter = Montserrat({
  weight: ["300", "400", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Evento - Find events near you",
    template: "%s | Evento - Find events near you",
  },
  description:
    "Evento is an event management platform that allows you to create, discover and share events near you.",
  category: "Social",
  keywords: [
    "events",
    "event",
    "event management",
    "party",
    "creators",
    "djs",
    "mood",
  ],
  colorScheme: "light",
  creator: "Maria",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-white flex dark:bg-gray-950 dark:text-white`}
        >
          <Provider>
            <ClientOnly>
              <header className="flex flex-col h-screen overflow-y-auto w-52">
                <Navbar />
              </header>
            </ClientOnly>
            <main className="flex flex-col flex-grow w-full overflow-y-auto h-screen">
              <div className="flex items-center justify-between w-full border-b border-gray-200 p-4">
                <Search />
                <Link
                  className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white font-semibold py-2 px-4 rounded hover:shadow-lg transition duration-300 ease-in-out"
                  href="/events/new"
                >
                  Create Event
                </Link>
              </div>
              {children}
            </main>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
