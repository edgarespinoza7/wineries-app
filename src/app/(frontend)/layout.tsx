import React from 'react'
import { Jost } from 'next/font/google'
import './styles.css'

export const metadata = {
  description: 'Find the best Wineries in Valencia',
  title: 'Wineries in Valencia',
}

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={jost.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
