import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Of Course',
  description: 'Of Course - Sua plataforma de cursos',
}
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
