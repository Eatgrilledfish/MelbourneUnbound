import { Roboto } from 'next/font/google'
import './global.css';
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 添加UserWay脚本 */}
        <script
          src="https://cdn.userway.org/widget.js"
          data-account="47YS0NIhsq"
          async
        ></script>
      </head>
      <body>
        {children}
        <div id="userway-container"></div>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'MelbourneUnbound',
  description: 'A Better Accessible Melbourne',
}


