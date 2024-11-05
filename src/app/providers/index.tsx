'use client'
import React from 'react'
import ReactQueryProvider from './ReactQueryProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import theme from '@/theme'

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryProvider>
      <AppRouterCacheProvider>
        <CssBaseline />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </ReactQueryProvider>
  )
}
