import { Metadata } from "next";
import ClientOnly from "@/components/sections/client-only";
import "./globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import { Montserrat, Outfit } from "next/font/google";
import Navbar from "@/components/nav/navbar";
import Provider from "@/providers/provider";
import Categories from "@/components/sections/categories";

const inter = Outfit({
  weight: ["300", "400","500", "700"],
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
    <ClerkProvider
    appearance={{
      variables: {
        colorPrimary: "#6610F2",
        colorText: "#000000",
        colorSuccess: "#56E39F",
        colorDanger: "#E74C3C",
        colorWarning: "#F1C40F",
      },
      elements: {
        button: {
            backgroundColor: "#6610F2",
        },
      }
    }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-white`}>
          <Provider>
            <ClientOnly>
              <header>
                <Navbar />
                <Categories />
              </header>
            </ClientOnly>
            <main className="min-h-screen">{children}</main>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
