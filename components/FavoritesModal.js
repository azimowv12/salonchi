'use client'
import React from 'react'
import { IoClose, IoHeart, IoCartOutline } from 'react-icons/io5'
import { FiTrash2 } from 'react-icons/fi'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'

export default function FavoritesModal({ isOpen, onClose }) {
    const { favorites, removeFromFavorites, clearFavorites, favoritesCount } = useFavorites()
    const { addToCart } = useCart()

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(Math.round(price || 0))
    }

    // Chegirma narxini hisoblash
    const getDiscountedPrice = (product) => {
        return product.discountPercentage 
            ? Math.round(product.price * (1 - product.discountPercentage / 100))
            : product.price
    }

    // Savatga qo'shish
    const handleAddToCart = (product) => {
        addToCart(product)
    }

    // Mahsulotni sevimlilardan o'chirish
    const handleRemoveFavorite = (productId) => {
        removeFromFavorites(productId)
    }

    // Barcha sevimlilarni tozalash
    const handleClearFavorites = () => {
        if (window.confirm('Hamma sevimli mahsulotlarni o\'chirishni xohlaysizmi?')) {
            clearFavorites()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div 
                className="absolute inset-0  bg-opacity-50 transition-opacity"
                onClick={onClose}
            />
            
            {/* Sevimlilar paneli */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col">
                {/* Header - Fixed */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                            <IoHeart className="text-white text-lg" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Sevimlilar</h2>
                            <p className="text-sm text-gray-500">
                                {favoritesCount} ta mahsulot
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {favoritesCount > 0 && (
                            <button
                                onClick={handleClearFavorites}
                                className="w-10 h-10 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors text-red-500"
                                title="Barchasini o'chirish"
                            >
                                <FiTrash2 className="text-lg" />
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                        >
                            <IoClose className="text-2xl text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Mahsulotlar ro'yxati - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    {favoritesCount === 0 ? (
                        // Bo'sh sevimlilar
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mb-4">
                                <IoHeart className="text-3xl text-pink-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Sevimlilaringiz bo'sh
                            </h3>
                            <p className="text-gray-500 mb-6 max-w-xs">
                                Mahsulotlarni sevimlilarga qo'shish uchun yurakcha belgisini bosing
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                Mahsulotlarni ko'rish
                            </button>
                        </div>
                    ) : (
                        // Sevimlilar ro'yxati
                        <div className="space-y-4">
                            {favorites.map((product) => {
                                const discountedPrice = getDiscountedPrice(product)
                                const savedAmount = product.price - discountedPrice

                                return (
                                    <div key={product.id} className="flex gap-4 p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl border border-pink-100 hover:shadow-md transition-all duration-300">
                                        {/* Mahsulot rasmi */}
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                className="w-20 h-20 object-cover rounded-xl"
                                            />
                                            {/* Sevimli belgisi */}
                                            <button
                                                onClick={() => handleRemoveFavorite(product.id)}
                                                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                                            >
                                                <IoHeart className="text-sm" />
                                            </button>
                                        </div>
                                        
                                        {/* Mahsulot ma'lumotlari */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight mb-2">
                                                {product.title}
                                            </h3>
                                            
                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <span className="text-xs">⭐</span>
                                                    <span className="text-xs font-medium">{product.rating}</span>
                                                </div>
                                                <span className="text-gray-400 text-xs">•</span>
                                                <span className="text-gray-500 text-xs">
                                                    {product.reviews?.length || 0} sharh
                                                </span>
                                            </div>

                                            {/* Narx */}
                                            <div className="space-y-1 mb-3">
                                                <div className="text-lg font-bold text-gray-900">
                                                    {formatPrice(discountedPrice)} $
                                                </div>
                                                {product.discountPercentage > 0 && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-400 line-through">
                                                            {formatPrice(product.price)} $
                                                        </span>
                                                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                                                            -{Math.round(product.discountPercentage)}%
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Tugmalar */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                                                >
                                                    <IoCartOutline className="text-base group-hover:scale-110 transition-transform" />
                                                    Savatga
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveFavorite(product.id)}
                                                    className="w-10 h-10 bg-white text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center group"
                                                    title="Sevimlilardan o'chirish"
                                                >
                                                    <FiTrash2 className="text-sm group-hover:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Footer - Fixed */}
                {favoritesCount > 0 && (
                    <div className="border-t border-gray-200 p-6 bg-white flex-shrink-0">
                        <div className="space-y-3">
                            <button
                                onClick={onClose}
                                className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <IoHeart className="text-xl group-hover:scale-110 transition-transform" />
                                {favoritesCount} ta sevimli
                            </button>
                            
                            <button
                                onClick={handleClearFavorites}
                                className="w-full border-2 border-red-500 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 group"
                            >
                                <FiTrash2 className="text-lg group-hover:scale-110 transition-transform" />
                                Barchasini o'chirish
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}