'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    // LocalStorage'dan savatni yuklash
    useEffect(() => {
        const savedCart = localStorage.getItem('salonchi-cart')
        if (savedCart) {
            setCartItems(JSON.parse(savedCart))
        }
    }, [])

    // Savatni localStorage'ga saqlash
    useEffect(() => {
        localStorage.setItem('salonchi-cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id)
            
            if (existingItem) {
                // Mahsulot savatda bo'lsa, sonini oshiramiz
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                // Yangi mahsulot qo'shamiz
                return [...prevItems, { ...product, quantity: 1 }]
            }
        })
    }

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId)
            return
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        )
    }

    const clearCart = () => {
        setCartItems([])
    }

    const getCartItemsCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.discountPercentage 
                ? Math.round(item.price * (1 - item.discountPercentage / 100))
                : item.price
            return total + (price * item.quantity)
        }, 0)
    }

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        getCartTotal
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}   