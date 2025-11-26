'use client'
import React, { useState, useEffect } from 'react'
import { IoClose, IoCartOutline, IoTrashOutline } from 'react-icons/io5'
import { FiMinus, FiPlus, FiArrowUp } from 'react-icons/fi'
import { useCart } from './CartContext'

export default function Cart({ isOpen, onClose }) {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [showScrollTop, setShowScrollTop] = useState(false)

    // Scrollni kuzatish
    useEffect(() => {
        const handleScroll = () => {
            const cartContent = document.querySelector('.cart-content')
            if (cartContent) {
                setShowScrollTop(cartContent.scrollTop > 200)
            }
        }

        const cartContent = document.querySelector('.cart-content')
        if (cartContent) {
            cartContent.addEventListener('scroll', handleScroll)
            return () => cartContent.removeEventListener('scroll', handleScroll)
        }
    }, [isOpen])

    // Scroll to top function
    const scrollToTop = () => {
        const cartContent = document.querySelector('.cart-content')
        if (cartContent) {
            cartContent.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    // Format price - dollar formatida
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(Math.round(price || 0))
    }

    // Miqdorni oshirish
    const increaseQuantity = (itemId) => {
        const item = cartItems.find(item => item.id === itemId)
        if (item) {
            updateQuantity(itemId, (item.quantity || 0) + 1)
        }
    }

    // Miqdorni kamaytirish
    const decreaseQuantity = (itemId) => {
        const item = cartItems.find(item => item.id === itemId)
        if (item && item.quantity > 1) {
            updateQuantity(itemId, item.quantity - 1)
        } else if (item && item.quantity === 1) {
            removeFromCart(itemId)
        }
    }

    // Mahsulotni o'chirish
    const removeItem = (itemId) => {
        removeFromCart(itemId)
    }

    // Chegirma narxini hisoblash
    const getDiscountedPrice = (product) => {
        return product.discountPercentage 
            ? Math.round(product.price * (1 - product.discountPercentage / 100))
            : product.price
    }

    // Buyurtma berish
    const handleCheckout = () => {
        setIsCheckingOut(true)
        setTimeout(() => {
            setIsCheckingOut(false)
            alert('Buyurtmangiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.')
            clearCart()
            if (onClose) onClose()
        }, 2000)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Orqa fon */}
            <div 
                className="absolute inset-0  bg-opacity-50 transition-opacity"
                onClick={onClose}
            />
            
            {/* Savat paneli */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col">
                {/* Header - Fixed */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <IoCartOutline className="text-white text-lg" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Savat</h2>
                            <p className="text-sm text-gray-500">
                                {cartItems.length} ta mahsulot
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                        <IoClose className="text-2xl text-gray-600" />
                    </button>
                </div>

                {/* Mahsulotlar ro'yxati - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 cart-content">
                    {cartItems.length === 0 ? (
                        // Bo'sh savat
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <IoCartOutline className="text-3xl text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Savatingiz bo'sh
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Hozircha savatingizda mahsulot yo'q
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                Xarid qilishni boshlash
                            </button>
                        </div>
                    ) : (
                        // Mahsulotlar ro'yxati
                        <div className="space-y-4">
                            {cartItems.map((item) => {
                                const discountPrice = getDiscountedPrice(item)
                                const itemTotal = discountPrice * item.quantity
                                const originalTotal = item.price * item.quantity
                                const savedAmount = originalTotal - itemTotal

                                return (
                                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                                        {/* Mahsulot rasmi */}
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                                        />
                                        
                                        {/* Mahsulot ma'lumotlari */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                                                    {item.title}
                                                </h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2 p-1 hover:bg-red-50 rounded-lg"
                                                >
                                                    <IoTrashOutline className="text-lg" />
                                                </button>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mb-3">
                                                {/* Narx */}
                                                <div className="space-y-1">
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {formatPrice(item.price)} $
                                                    </div>
                                                    {item.discountPercentage > 0 && (
                                                        <div className="text-sm text-gray-400 line-through">
                                                            {formatPrice(item.price)} $
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Miqdor boshqaruvi */}
                                                <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2 border border-gray-200 shadow-sm">
                                                    <button
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        disabled={item.quantity <= 1}
                                                        className={`w-6 h-6 flex items-center justify-center rounded-lg transition-all ${
                                                            item.quantity <= 1 
                                                                ? 'text-gray-300 cursor-not-allowed' 
                                                                : 'text-gray-600 hover:bg-gray-100 hover:text-orange-600'
                                                        }`}
                                                    >
                                                        <FiMinus className="text-sm" />
                                                    </button>
                                                    <span className="font-semibold text-gray-800 min-w-6 text-center text-lg">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => increaseQuantity(item.id)}
                                                        className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-all"
                                                    >
                                                        <FiPlus className="text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            {/* Umumiy summa va tejangan mablag' */}
                                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">Umumiy:</span>
                                                    <span className="text-lg font-bold text-orange-600">
                                                        {formatPrice(itemTotal)} $
                                                    </span>
                                                </div>
                                                {savedAmount > 0 && (
                                                    <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg">
                                                        💰 {formatPrice(savedAmount)} $ tejadingiz
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Bo'sh joy qo'shamiz */}
                            <div className="h-20"></div>
                        </div>
                    )}
                </div>

                {/* Scroll to top button */}
                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className="absolute bottom-24 right-6 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-all hover:scale-110"
                    >
                        <FiArrowUp className="text-lg" />
                    </button>
                )}

                {/* Footer - Fixed */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-6 bg-white flex-shrink-0">
                        {/* Chegirma va yetkazib berish */}
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Mahsulotlar:</span>
                                <span className="font-medium text-gray-900">{formatPrice(getCartTotal())} $</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Yetkazib berish:</span>
                                <span className="font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">🚚 Bepul</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Jami chegirma:</span>
                                <span className="font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                    -{formatPrice(
                                        cartItems.reduce((sum, item) => {
                                            const originalTotal = item.price * item.quantity
                                            const discountTotal = getDiscountedPrice(item) * item.quantity
                                            return sum + (originalTotal - discountTotal)
                                        }, 0)
                                    )} $
                                </span>
                            </div>
                        </div>

                        {/* Jami summa */}
                        <div className="flex justify-between items-center mb-6 py-4 border-y border-gray-200">
                            <span className="text-lg font-bold text-gray-900">Jami to'lov:</span>
                            <span className="text-2xl font-bold text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                                {formatPrice(getCartTotal())} $
                            </span>
                        </div>

                        {/* Tugmalar */}
                        <div className="space-y-3">
                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                            >
                                {isCheckingOut ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Qayta ishlanmoqda...
                                    </div>
                                ) : (
                                    `Buyurtma berish - ${formatPrice(getCartTotal())} $`
                                )}
                            </button>
                            
                            <div className="flex gap-3">
                                <button
                                    onClick={clearCart}
                                    className="flex-1 py-3 border-2 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-colors"
                                >
                                    Tozalash
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
                                >
                                    Davom etish
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}