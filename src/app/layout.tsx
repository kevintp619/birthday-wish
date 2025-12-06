import type { Metadata } from 'next'
import {  Poppins } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import './globals.css'


const inter = Poppins({ subsets: ['latin'], weight: "500" })

export const metadata: Metadata = {
  applicationName: "Birthday wish",
  authors: [
    {
      name: "Shawkat Hossain Maruf",
      url: "https://shawkath646.pro"
    }
  ],
  title: {
    default: "Happy Birthday",
    template: "%s | Happy Birthday"
  },
  description: "Designed with love, this website allows you to send heartfelt wishes to your favorite people seamlessly and from anywhere. Packed with a plethora of animations, the site is not just visually stunning but also well-organized and responsive across all devices. Celebrate special moments with us, bringing joy to loved ones no matter where they are.",
  category: "website",
  icons: ["/favicon.ico"],
  publisher: "CloudBurst Lab",
  creator: "Shawkat Hossain Maruf",
  keywords: ["Next.js 16", "birthday wishes", "animated greetings", "well-organized", "remotely wish", "timer wish", "special occasions", "celebration", "heartfelt messages", "joyous moments", "virtual celebrations", "digital greetings", "responsive design", "animated birthday wishes", "seamless wishes", "remote celebrations", "best wishes", "personalized messages", "cloudburst lab"],
  metadataBase: process.env.NEXT_PUBLIC_APP_BASE_URL,
  openGraph: {
    images: '/opengraph-image.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="dark:[color-scheme:dark]">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#9333ea" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
