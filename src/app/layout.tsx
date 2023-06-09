import './globals.css'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './lib/registry';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  description: 'Generated by create next app',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head className=''></head>
      <body><StyledComponentsRegistry>{children}</StyledComponentsRegistry></body>
    </html>
  )
}
