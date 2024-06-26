import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/components/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: "Blog App - Homepage",
    template: "%s | Blog App"
  },
  description: "A simple blog app built with Next.js and Mongoose - This is the homepage.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='container'>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}