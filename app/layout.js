import './globals.css'

export const metadata = {
  title: 'AI Makeup Rating',
  description: 'Transform your beauty routine with cutting-edge AI technology',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}