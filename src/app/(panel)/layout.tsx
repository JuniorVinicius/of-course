import Header from '@/components/global/Header'
import { Stack } from '@mui/material'

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main lang="en">
      <Stack p={0}>
        <Header />
        <Stack paddingX="30px" paddingY="40px">
          {children}
        </Stack>
      </Stack>
    </main>
  )
}
