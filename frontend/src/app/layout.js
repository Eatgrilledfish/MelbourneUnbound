export const metadata = {
  title: 'MelbourneunBound',
  description: 'A Better Accessible Melbourne',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
