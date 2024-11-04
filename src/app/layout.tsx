import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Of Course',
  description: 'Of Course Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
