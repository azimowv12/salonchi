import './globals.css';
import Navbar from '@/components/Navbar'
import { CartProvider } from '../context/CartContext'
import { FavoritesProvider } from '../context/FavoritesContext'
import { DarkModeProvider } from '../context/DarkModeContext'
import Footer from '@/components/Footer'
import NavbarTop from '@/components/navbarTop'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          <CartProvider>
            <FavoritesProvider>
              <NavbarTop />
              <Navbar />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
              {children}
              <Footer />
            </FavoritesProvider>
          </CartProvider>
        </DarkModeProvider>
      </body>
    </html>
  )
}