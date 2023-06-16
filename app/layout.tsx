import { Metadata } from 'next'
import './globals.css'
import { Fira_Sans } from 'next/font/google'

const firasans = Fira_Sans({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext", "vietnamese"],
})


export const metadata: Metadata = {
  title: {
    default: "Mood - Find events near you",
    template: "%s | Mood - Find events near you",
  },
  description: 'Mood is an event management platform that allows you to create, discover and share events near you.',
  category: 'Social',
  keywords: ["events", "event", "event management", "party", "creators", "djs", "mood"],
  colorScheme: "light",
  creator: "Mood",
  openGraph: {
    type: "website",
    locale: "en_PT",
    countryName: "Portugal",
    siteName: "Mood",
    url: "https://localhost:3000",
    title: "Mood - Find events near you",
    description: "Mood is an event management platform that allows you to create, discover and share events near you.",
    images: []
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={firasans.className}>{children}</body>
    </html>
  )
}
