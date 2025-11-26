import Navbar from '@/components/Navbar'
import { CartProvider } from '../context/CartContext'
import { FavoritesProvider } from '../context/FavoritesContext'
import Footer from '@/components/Footer'
import NavbarTop from '@/components/navbarTop'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <FavoritesProvider>
            <NavbarTop />
            <Navbar />
            {children}
            <Footer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  )
}