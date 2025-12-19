'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Title from '../ui/title'
import { IoCartOutline, IoHeartOutline, IoHeart } from 'react-icons/io5'
import { FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useFavorites } from '../../context/FavoritesContext'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useDarkMode } from '@/context/DarkModeContext'

export default function Hero() {
    const [products, setProducts] = useState([])
    const { isDark } = useDarkMode();
    const [filteredProducts, setFilteredProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [productQuantities, setProductQuantities] = useState({})
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const [showAllCategories, setShowAllCategories] = useState(false)
    const productsPerPage = 25

    const { addToCart } = useCart()
    const { toggleFavorite, isFavorite } = useFavorites()

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(product =>
                product.category === selectedCategory.slug
            )
            setFilteredProducts(filtered)
        } else {
            setFilteredProducts(products)
        }
        setCurrentPage(1)
    }, [selectedCategory, products])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get('https://dummyjson.com/products?limit=200')
            setProducts(response.data.products)
            setFilteredProducts(response.data.products)
        } catch (error) {
            console.error('Error products:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/products/categories')
            const categoriesData = response.data.map((cat, index) => ({
                id: index + 1,
                name: cat.name || cat,
                slug: cat.slug || cat,
                icon: getCategoryIcon(cat),
                productCount: Math.floor(Math.random() * 50) + 10
            }))
            setCategories(categoriesData)
        } catch (error) {
            console.error('Error categories:', error)
        }
    }

    const getCategoryIcon = (category) => {
        const categoryIcons = {
            'smartphones': '/products/mashinka.png',
            'laptops': '/products/stoll.png',
            'fragrances': '/products/kasmetik.png',
            'skincare': '/products/kasmetik.png',
            'groceries': '/products/trimmer.png',
            'home-decoration': '/products/stoll.png',
            'furniture': '/products/stoll.png',
            'tops': '/products/mashinka.png',
            'womens-dresses': '/products/mashinka.png',
            'womens-shoes': '/products/mashinka.png',
            'mens-shirts': '/products/mashinka.png',
            'mens-shoes': '/products/mashinka.png',
            'mens-watches': '/products/mashinka.png',
            'womens-watches': '/products/mashinka.png',
            'womens-bags': '/products/mashinka.png',
            'womens-jewellery': '/products/mashinka.png',
            'sunglasses': '/products/mashinka.png',
            'automotive': '/products/mashinka.png',
            'motorcycle': '/products/mashinka.png',
            'lighting': '/products/fen.png'
        }

        const categoryName = typeof category === 'string' ? category.toLowerCase() : category.slug
        return categoryIcons[categoryName] || '/products/stoll.png'
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    const handleClearFilter = () => {
        setSelectedCategory(null)
    }

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleAddToCart = (product) => {
        const quantity = productQuantities[product.id] || 1

        toast.success(
            `${quantity} ta "${product.title.substring(0, 30)}${product.title.length > 30 ? '...' : ''}" savatga qo'shildi!`,
            {
                duration: 3000,
                style: {
                    borderRadius: '10px',
                    background: '#10b981',
                    color: '#fff',
                },
            }
        )

        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        setProductQuantities(prev => ({
            ...prev,
            [product.id]: 1
        }))
    }

    const increaseQuantity = (productId) => {
        setProductQuantities(prev => ({
            ...prev,
            [productId]: (prev[productId] || 1) + 1
        }))
    }

    const decreaseQuantity = (productId) => {
        setProductQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, (prev[productId] || 1) - 1)
        }))
    }

    const handleToggleFavorite = (product) => {
        const wasFavorite = isFavorite(product.id)

        if (wasFavorite) {
            toast(
                `"${product.title.substring(0, 30)}${product.title.length > 30 ? '...' : ''}" sevimlilardan o'chirildi`,
                {
                    duration: 2000,
                    icon: '💔',
                    style: {
                        borderRadius: '10px',
                        background: '#6b7280',
                        color: '#fff',
                    },
                }
            )
        } else {
            toast.success(
                `"${product.title.substring(0, 30)}${product.title.length > 30 ? '...' : ''}" sevimlilarga qo'shildi!`,
                {
                    duration: 2000,
                    style: {
                        borderRadius: '10px',
                        background: '#ef4444',
                        color: '#fff',
                    },
                }
            )
        }

        toggleFavorite(product)
    }

    const getDiscountedPrice = (product) => {
        return product.discountPercentage
            ? Math.round(product.price * (1 - product.discountPercentage / 100))
            : product.price
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(Math.round(price))
    }

    const displayedCategories = showAllCategories ? categories : categories.slice(0, 7)

    if (loading) {
        return (
            <div className={`max-w-7xl mx-auto mt-[56px] px-4 ${isDark ? 'bg-gray-900' : ''}`}>
                <div className='mb-8'>
                    <Title text={"Tavsiya qilamiz"} />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm animate-pulse`}>
                            <div className='p-4 pb-2'>
                                <div className={`w-full h-40 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg`}></div>
                            </div>
                            <div className='px-4 pb-4 space-y-2'>
                                <div className={`h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4`}></div>
                                <div className={`h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2`}></div>
                                <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/3`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={`max-w-7xl mx-auto mt-[56px] px-4 ${isDark ? "bg-gray-900 text-white" : "text-gray-900"}`}>
            <div className='mb-8'>
                <Title text={"Tavsiya qilamiz"} />
            </div>

            {/* Kategoriyalar */}
            <div className='mb-8'>
                <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl p-4 shadow-sm border`}>
                    <div className='flex items-center justify-between mb-3'>
                        {selectedCategory && (
                            <button
                                onClick={handleClearFilter}
                                className={`text-orange-500 text-xs font-medium px-3 py-1 ${isDark ? 'bg-orange-900/30' : 'bg-orange-50'} rounded-lg hover:bg-orange-100 transition-colors`}
                            >
                                Tozalash
                            </button>
                        )}
                    </div>

                    <div className='flex gap-2 overflow-x-auto pb-3'>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategorySelect(category)}
                                className={`flex items-center p-3 rounded-lg transition-all whitespace-nowrap flex-shrink-0 border ${selectedCategory?.id === category.id
                                        ? 'bg-orange-100 border-orange-500 text-orange-700'
                                        : isDark
                                            ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-orange-900/30 hover:border-orange-500'
                                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300'
                                    }`}
                            >
                                <img
                                    src={category.icon}
                                    alt={category.name}
                                    className='w-5 h-5 object-contain'
                                />
                                <span className='ml-2 text-sm font-medium'>
                                    {category.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mahsulotlar */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
                {currentProducts.map((product) => {
                    const discountedPrice = getDiscountedPrice(product)
                    const favorite = isFavorite(product.id)
                    const quantity = productQuantities[product.id] || 1

                    return (
                        <div
                            key={product.id}
                            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border group flex flex-col h-full`}
                        >
                            <Link href={`/product/${product.id}`} className='block'>
                                <div className='relative p-3 pb-0 flex-shrink-0'>
                                    <div className={`relative overflow-hidden rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'} aspect-square`}>
                                        <img
                                            src={product.thumbnail || '/placeholder-image.jpg'}
                                            alt={product.title}
                                            className='w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300'
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = '/placeholder-image.jpg'
                                            }}
                                        />
                                    </div>

                                    {product.discountPercentage > 0 && (
                                        <div className='absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded text-xs font-semibold shadow'>
                                            -{Math.round(product.discountPercentage)}%
                                        </div>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            handleToggleFavorite(product)
                                        }}
                                        className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${favorite
                                                ? 'text-red-500 bg-red-50 shadow'
                                                : isDark
                                                    ? 'text-gray-300 bg-gray-700/80 hover:text-red-500 hover:bg-red-900/30'
                                                    : 'text-gray-400 bg-white/80 hover:text-red-500 hover:bg-red-50'
                                            }`}
                                    >
                                        {favorite ?
                                            <IoHeart className="text-lg" /> :
                                            <IoHeartOutline className="text-lg" />
                                        }
                                    </button>
                                </div>
                            </Link>

                            <div className='p-3 pt-2 space-y-2 flex-grow flex flex-col'>
                                <Link href={`/product/${product.id}`} className='block flex-grow'>
                                    <h3 className={`${isDark ? 'text-gray-200' : 'text-gray-800'} font-medium text-sm line-clamp-2 hover:text-orange-600 mb-2`}>
                                        {product.title}
                                    </h3>

                                    <div className='flex items-center gap-1 text-amber-500 text-sm mb-2'>
                                        <span>⭐</span>
                                        <span>{product.rating}</span>
                                        <span className='text-gray-400 mx-1'>•</span>
                                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                                            {Math.floor(Math.random() * 100)} sharh
                                        </span>
                                    </div>

                                    <div className='space-y-1 mb-3'>
                                        <div className='text-orange-500 text-xs font-semibold'>
                                            {formatPrice(Math.round(product.price / 12))} $/oyiga
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            {product.discountPercentage > 0 ? (
                                                <>
                                                    <span className='text-gray-400 text-sm line-through'>
                                                        {formatPrice(product.price)} $
                                                    </span>
                                                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                        {formatPrice(discountedPrice)} $
                                                    </span>
                                                </>
                                            ) : (
                                                <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {formatPrice(product.price)} $
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>

                                <div className='space-y-2 pt-1 mt-auto'>
                                    <div className={`flex items-center justify-between ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-1`}>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                onClick={() => decreaseQuantity(product.id)}
                                                className={`w-6 h-6 flex items-center justify-center rounded ${isDark
                                                        ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500'
                                                        : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
                                                    } hover:border-orange-300 transition-colors`}
                                            >
                                                <FiMinus className="text-xs" />
                                            </button>
                                            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'} text-sm min-w-6 text-center`}>
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => increaseQuantity(product.id)}
                                                className={`w-6 h-6 flex items-center justify-center rounded ${isDark
                                                        ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500'
                                                        : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
                                                    } hover:border-orange-300 transition-colors`}
                                            >
                                                <FiPlus className="text-xs" />
                                            </button>
                                        </div>
                                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {product.stock || 100} ta
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className='w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95'
                                    >
                                        <FiShoppingBag className="text-base" />
                                        Savatga ({quantity})
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Pagination */}
            {currentProducts.length > 0 && (
                <div className='flex justify-center items-center gap-2 mt-8 mb-12'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm ${currentPage === 1
                                ? isDark
                                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed border-gray-700'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : isDark
                                    ? 'bg-gray-800 text-gray-200 hover:bg-orange-900/30 hover:text-orange-500 hover:border-orange-500 border-gray-700'
                                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300'
                            }`}
                    >
                        ←
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                        let pageNumber
                        if (totalPages <= 5) {
                            pageNumber = index + 1
                        } else if (currentPage <= 3) {
                            pageNumber = index + 1
                        } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + index
                        } else {
                            pageNumber = currentPage - 2 + index
                        }

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-semibold ${currentPage === pageNumber
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow'
                                        : isDark
                                            ? 'bg-gray-800 text-gray-200 hover:bg-orange-900/30 hover:text-orange-500 hover:border-orange-500 border-gray-700'
                                            : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300'
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        )
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm ${currentPage === totalPages
                                ? isDark
                                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed border-gray-700'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : isDark
                                    ? 'bg-gray-800 text-gray-200 hover:bg-orange-900/30 hover:text-orange-500 hover:border-orange-500 border-gray-700'
                                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300'
                            }`}
                    >
                        →
                    </button>
                </div>
            )}

            {currentProducts.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-5xl mb-3">😔</div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Hech narsa topilmadi</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>Tanlangan kategoriyada mahsulot topilmadi</p>
                    <button
                        onClick={handleClearFilter}
                        className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-orange-600 hover:shadow transition-all"
                    >
                        Barcha mahsulotlarni ko'rish
                    </button>
                </div>
            )}
        </div>
    )
}