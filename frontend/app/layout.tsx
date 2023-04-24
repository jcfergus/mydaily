import './globals.css'

export const metadata = {
  title: 'MyDaily',
  description: 'Daily news, just for you!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
