'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Title from '../ui/title'
import { IoCartOutline, IoHeartOutline, IoHeart } from 'react-icons/io5'
import { FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useFavorites } from '../../context/FavoritesContext'
import Link from 'next/link'

export default function Hero() {
    const [products, setProducts] = useState([])
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
            setCategories(getDefaultCategories())
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
            <div className='max-w-7xl mx-auto mt-[56px] px-4'>
                <div className='mb-8'>
                    <Title text={"Tavsiya qilamiz"} />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className='bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 animate-pulse'>
                            <div className='p-6 pb-4 flex flex-col items-center'>
                                <div className='w-32 h-32 bg-gray-200 rounded-xl'></div>
                            </div>
                            <div className='px-6 pb-6 space-y-3'>
                                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                                <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                                <div className='h-3 bg-gray-200 rounded w-2/3'></div>
                                <div className='h-6 bg-gray-200 rounded w-1/3'></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='max-w-7xl mx-auto mt-[56px] px-4'>
            <div className='mb-8'>
                <Title text={"Tavsiya qilamiz"} />
            </div>

            {/* Katalog bo'limi */}
            <div className='mb-8 hidden md:block'>
                <div className='flex flex-wrap gap-4 items-center justify-between bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
                    <div className='flex flex-wrap gap-4'>
                        {displayedCategories.map((category) => (
                            <div
                                key={category.id}
                                className={`flex gap-2 items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedCategory?.id === category.id
                                        ? 'bg-orange-100 border-2 border-orange-500 shadow-md'
                                        : 'bg-gray-50 hover:bg-orange-50 border-2 border-transparent hover:border-orange-200'
                                    }`}
                                onClick={() => handleCategorySelect(category)}
                            >
                                <img
                                    src={category.icon}
                                    alt={category.name}
                                    className='w-6 h-6 object-contain'
                                />
                                <div className="flex flex-col">
                                    <h1 className='text-[16px] font-medium leading-[100%] text-gray-800'>
                                        {category.name}
                                    </h1>
                                    <span className="text-xs text-gray-500 mt-1">
                                        {category.productCount} mahsulot
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {selectedCategory && (
                            <button
                                onClick={handleClearFilter}
                                className="text-orange-500 hover:text-orange-600 font-medium text-sm bg-orange-50 px-4 py-2 rounded-lg transition-colors"
                            >
                                Filterni tozalash
                            </button>
                        )}

                        <div className="relative">
                            <select
                                value={showAllCategories ? 'all' : 'some'}
                                onChange={(e) => setShowAllCategories(e.target.value === 'all')}
                                className='text-[#4D5761] text-[16px] font-medium leading-[100%] pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none cursor-pointer'
                            >
                                <option value="some">Ko'proq ko'rish</option>
                                <option value="all">Barchasini ko'rish</option>
                            </select>
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tanlangan kategoriya ko'rsatkich */}
                {selectedCategory && (
                    <div className="mt-4 flex items-center gap-4 bg-orange-50 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={selectedCategory.icon}
                                alt={selectedCategory.name}
                                className='w-8 h-8 object-contain'
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800">{selectedCategory.name}</h3>
                                <p className="text-sm text-gray-600">
                                    {filteredProducts.length} ta mahsulot topildi
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Katalog */}
            <div className='mb-6 md:hidden'>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-800">Kategoriyalar</h3>
                        <button
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className="text-orange-500 text-sm font-medium"
                        >
                            {showAllCategories ? 'Yopish' : 'Barchasi'}
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {categories.slice(0, showAllCategories ? categories.length : 6).map((category) => (
                            <div
                                key={category.id}
                                className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${selectedCategory?.id === category.id
                                        ? 'bg-orange-100 border border-orange-500'
                                        : 'bg-gray-50 hover:bg-orange-50 border border-transparent'
                                    }`}
                                onClick={() => handleCategorySelect(category)}
                            >
                                <img
                                    src={category.icon}
                                    alt={category.name}
                                    className='w-6 h-6 object-contain mb-1'
                                />
                                <span className="text-xs font-medium text-gray-800 text-center leading-tight">
                                    {category.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {selectedCategory && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <button
                                onClick={handleClearFilter}
                                className="w-full text-center text-orange-500 hover:text-orange-600 font-medium text-sm py-2"
                            >
                                Filterni tozalash
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mahsulotlar */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                {currentProducts.map((product) => {
                    const discountedPrice = getDiscountedPrice(product)
                    const favorite = isFavorite(product.id)
                    const quantity = productQuantities[product.id] || 1

                    return (
                        <Link href={`/product/${product.id}`}
                            key={product.id}
                            className='group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-100'
                        >
                            <div className='relative p-6 pb-4'>
                                <div className='relative overflow-hidden rounded-xl'>
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                                    />
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleToggleFavorite(product)
                                    }}
                                    className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${favorite
                                            ? 'bg-red-500 text-white shadow-lg animate-pulse'
                                            : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500 shadow-sm'
                                        }`}
                                >
                                    {favorite ? <IoHeart className="text-lg" /> : <IoHeartOutline className="text-lg" />}
                                </button>

                                {product.discountPercentage > 0 && (
                                    <div className='absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg'>
                                        -{Math.round(product.discountPercentage)}%
                                    </div>
                                )}
                            </div>

                            <div className='p-6 pt-4 space-y-3'>
                                <h3 className='text-gray-800 font-medium leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors'>
                                    {product.title}
                                </h3>

                                <div className='flex items-center gap-2'>
                                    <div className='flex items-center gap-1 text-amber-500'>
                                        <span className='text-sm'>⭐</span>
                                        <span className='text-sm font-medium'>{product.rating}</span>
                                    </div>
                                    <span className='text-gray-400 text-sm'>•</span>
                                    <span className='text-gray-500 text-sm'>
                                        {product.reviews?.length || 0} sharh
                                    </span>
                                </div>

                                <div className='space-y-2'>
                                    <div className='text-orange-500 text-sm font-semibold'>
                                        {formatPrice(Math.round(product.price / 12))} $/oyiga
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        {product.discountPercentage > 0 ? (
                                            <>
                                                <span className='text-gray-400 text-sm line-through'>
                                                    {formatPrice(product.price)} $
                                                </span>
                                                <span className='text-2xl font-bold text-gray-900'>
                                                    {product.price} $
                                                </span>
                                            </>
                                        ) : (
                                            <span className='text-2xl font-bold text-gray-900'>
                                                {formatPrice(product.price)} $
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className='space-y-3 pt-2'>
                                    <div className='flex items-center justify-between bg-gray-50 rounded-xl p-2'>
                                        <span className='text-sm font-medium text-gray-600'>Miqdor:</span>
                                        <div className='flex items-center gap-3'>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    decreaseQuantity(product.id)
                                                }}
                                                className='w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors'
                                            >
                                                <FiMinus className="text-sm" />
                                            </button>
                                            <span className='font-bold text-gray-800 min-w-8 text-center'>
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    increaseQuantity(product.id)
                                                }}
                                                className='w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors'
                                            >
                                                <FiPlus className="text-sm" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex gap-2'>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleAddToCart(product)
                                            }}
                                            className='flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn'
                                        >
                                            <FiShoppingBag className="text-lg group-hover/btn:scale-110 transition-transform" />
                                            Savatga ({quantity})
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleAddToCart(product)
                                            }}
                                            className='w-12 h-12 bg-orange-50 text-orange-500 rounded-xl hover:bg-orange-100 transition-colors flex items-center justify-center group/cart'
                                        >
                                            <IoCartOutline className="text-xl group-hover/cart:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Pagination */}
            {currentProducts.length > 0 && (
                <div className='flex justify-center items-center gap-2 mt-12 mb-16'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600'
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
                                className={`w-12 h-12 flex items-center justify-center rounded-xl border font-semibold transition-all ${currentPage === pageNumber
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg'
                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600'
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        )
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all ${currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600'
                            }`}
                    >
                        →
                    </button>
                </div>
            )}

            {currentProducts.length === 0 && (
                <div className="text-center py-16">
                    <div className="text-gray-400 text-6xl mb-4">😔</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Hech narsa topilmadi</h3>
                    <p className="text-gray-500 mb-6">Tanlangan kategoriyada mahsulot topilmadi</p>
                    <button
                        onClick={handleClearFilter}
                        className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                    >
                        Barcha mahsulotlarni ko'rish
                    </button>
                </div>
            )}
        </div>
    )
}