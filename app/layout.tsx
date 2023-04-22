import './globals.css'
import SupabaseProvider from "@/app/supabase-provider";

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
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  )
}
