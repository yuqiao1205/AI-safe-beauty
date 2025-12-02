import './globals.css'

export const metadata = {
  title: 'AI Discover Safe Beauty',
  description: 'Transform your beauty routine with cutting-edge AI technology',
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/favicon-16x16.png?v=4', '/favicon-32x32.png?v=4'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}