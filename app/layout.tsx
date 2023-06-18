import { Metadata } from "next";
import ClientOnly from "@/components/sections/client-only";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Navbar from "@/components/nav/navbar";
import Container from "@/components/sections/container";
import Provider from "@/providers/provider";
import Categories from "@/components/sections/categories";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
        <body className={`${inter.className} bg-white flex`}>
          <ClientOnly>
          <Provider />
            <header
            className="flex flex-col h-screen overflow-y-auto w-52"
            >
              <Navbar />
              <Categories />
            </header>
          </ClientOnly>
            <main className="flex flex-col flex-grow w-full overflow-y-auto h-screen">
              {children}
            </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
