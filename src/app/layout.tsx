import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Wedding Thank You',
  description: 'A thank you message for our wonderful wedding guests',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}