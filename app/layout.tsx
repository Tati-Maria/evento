import { Metadata } from "next";
import ClientOnly from "@/components/sections/client-only";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat, Outfit } from "next/font/google";
import Navbar from "@/components/nav/navbar";
import Provider from "@/providers/provider";
import Categories from "@/components/sections/categories";
import Container from "@/components/sections/container";
import Footer from "@/components/sections/footer";

const outfit = Outfit({
  weight: ["300", "400", "500", "700"],
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
        <body className={`${outfit.className} bg-white dark:bg-gray-950 dark:text-white`}>
          <Provider>
            <Container>
              <ClientOnly>
                <header>
                  <Navbar />
                  <Categories />
                </header>
              </ClientOnly>
              <main className="min-h-screen">{children}</main>
            </Container>
            <Footer />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
