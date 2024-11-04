import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import { Roboto } from 'next/font/google'
import { CssBaseline } from '@mui/material'

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
        <AppRouterCacheProvider>
          <CssBaseline />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
