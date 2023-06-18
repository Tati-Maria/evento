import { Metadata } from "next";
import ClientOnly from "@/components/sections/client-only";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Fira_Sans, Poppins } from "next/font/google";
import Navbar from "@/components/sections/nav-bar";
import Container from "@/components/sections/container";
import Provider from "@/providers/provider";
import Categories from "@/components/sections/categories";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Mood - Find events near you",
    template: "%s | Mood - Find events near you",
  },
  description:
    "Mood is an event management platform that allows you to create, discover and share events near you.",
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
  creator: "Mood",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} bg-gray-50 `}>
          <Provider />
          <Container>
            <ClientOnly>
              <header>
                <Navbar />
                <Categories />
              </header>
            </ClientOnly>
            <main className="min-h-screen">{children}</main>
            <footer>
              <div className="flex items-center justify-center py-4 border-t">
                <p className="text-gray-500">Made with ❤️ by Maria</p>
              </div>
            </footer>
          </Container>
        </body>
      </html>
    </ClerkProvider>
  );
}
