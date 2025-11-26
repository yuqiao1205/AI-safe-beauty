import './globals.css'

export const metadata = {
  title: 'AI Discover Safe Beauty',
  description: 'Transform your beauty routine with cutting-edge AI technology',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}