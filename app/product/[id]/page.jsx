'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { IoCartOutline, IoHeartOutline, IoHeart, IoStar, IoChevronBack } from 'react-icons/io5'
import { FiShoppingBag, FiMinus, FiPlus, FiShare2 } from 'react-icons/fi'
import { useCart } from '../../../context/CartContext'
import { useFavorites } from '../../../context/FavoritesContext'

export default function ProductDetail() {
    const params = useParams()
    const router = useRouter()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('description')

    const { addToCart } = useCart()
    const { toggleFavorite, isFavorite } = useFavorites()

    useEffect(() => {
        if (params.id) {
            fetchProduct()
        }
    }, [params.id])

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`https://dummyjson.com/products/${params.id}`)
            setProduct(response.data)
        } catch (error) {
            console.error('Error fetching product:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addToCart(product)
            }
            setQuantity(1)
        }
    }

    const handleToggleFavorite = () => {
        if (product) {
            toggleFavorite(product)
        }
    }

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1)
    }

    const decreaseQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1))
    }

    const getDiscountedPrice = () => {
        if (!product) return 0
        return product.discountPercentage
            ? Math.round(product.price * (1 - product.discountPercentage / 100))
            : product.price
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(Math.round(price))
    }

    const shareProduct = () => {
        if (navigator.share) {
            navigator.share({
                title: product.title,
                text: product.description,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('Link nusxalandi!')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-24 mb-6"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="h-96 bg-gray-200 rounded-xl"></div>
                                <div className="flex gap-4">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="h-20 bg-gray-200 rounded-lg flex-1"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-20 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Mahsulot topilmadi</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Bosh sahifaga qaytish
                    </button>
                </div>
            </div>
        )
    }

    const discountedPrice = getDiscountedPrice()
    const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <IoChevronBack className="text-lg" />
                        Orqaga
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <img
                                src={images[selectedImage]}
                                alt={product.title}
                                className="w-full h-96 object-contain rounded-lg"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 bg-white rounded-lg border-2 overflow-hidden transition-all ${selectedImage === index
                                                ? 'border-orange-500 shadow-md'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.title} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                    {product.title}
                                </h1>
                                <div className="flex gap-2">
                                    <button
                                        onClick={shareProduct}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                    >
                                        <FiShare2 className="text-lg" />
                                    </button>
                                    <button
                                        onClick={handleToggleFavorite}
                                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isFavorite(product.id)
                                                ? 'bg-red-500 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {isFavorite(product.id) ? <IoHeart className="text-lg" /> : <IoHeartOutline className="text-lg" />}
                                    </button>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full">
                                    <IoStar className="text-amber-500 text-lg" />
                                    <span className="font-semibold text-amber-700">{product.rating}</span>
                                </div>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-600">{product.reviews?.length || 0} sharh</span>
                                <span className="text-gray-500">•</span>
                                <span className="text-green-600 font-medium">{product.stock} ta qoldi</span>
                            </div>

                            {/* Brand & Category */}
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                                <span>Brend: <strong className="text-gray-900">{product.brand}</strong></span>
                                <span>•</span>
                                <span>Kategoriya: <strong className="text-gray-900">{product.category}</strong></span>
                            </div>

                            {/* Price */}
                            <div className="space-y-2 mb-6">
                                <div className="text-orange-500 text-sm font-semibold">
                                    {formatPrice(Math.round(product.price / 12))} $/oyiga
                                </div>
                                <div className="flex items-center gap-3">
                                    {product.discountPercentage > 0 ? (
                                        <>
                                            <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                                                {formatPrice(discountedPrice)} $
                                            </span>
                                            <span className="text-xl text-gray-400 line-through">
                                                {formatPrice(product.price)} $
                                            </span>
                                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                                                -{Math.round(product.discountPercentage)}%
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                                            {formatPrice(product.price)} $
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                                    <span className="font-medium text-gray-700">Miqdor:</span>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={decreaseQuantity}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                                        >
                                            <FiMinus className="text-sm" />
                                        </button>
                                        <span className="font-bold text-gray-800 text-xl min-w-8 text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={increaseQuantity}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                                        >
                                            <FiPlus className="text-sm" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                                    >
                                        <IoCartOutline className="text-xl group-hover:scale-110 transition-transform" />
                                        Savatga qo'shish ({quantity})
                                    </button>
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-14 h-14 bg-orange-50 text-orange-500 rounded-xl hover:bg-orange-100 transition-colors flex items-center justify-center group"
                                    >
                                        <FiShoppingBag className="text-xl group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                            {/* Tab Headers */}
                            <div className="border-b border-gray-200">
                                <div className="flex">
                                    <button
                                        onClick={() => setActiveTab('description')}
                                        className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'description'
                                                ? 'text-orange-500 border-b-2 border-orange-500'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Tavsif
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('specifications')}
                                        className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'specifications'
                                                ? 'text-orange-500 border-b-2 border-orange-500'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Xususiyatlar
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'reviews'
                                                ? 'text-orange-500 border-b-2 border-orange-500'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Sharhlar ({product.reviews?.length || 0})
                                    </button>
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {activeTab === 'description' && (
                                    <div className="prose max-w-none">
                                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                                    </div>
                                )}

                                {activeTab === 'specifications' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-sm text-gray-600">Brend</div>
                                            <div className="text-sm font-medium text-gray-900">{product.brand}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-sm text-gray-600">Kategoriya</div>
                                            <div className="text-sm font-medium text-gray-900">{product.category}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-sm text-gray-600">Qoldiq</div>
                                            <div className="text-sm font-medium text-gray-900">{product.stock} ta</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-sm text-gray-600">SKU</div>
                                            <div className="text-sm font-medium text-gray-900">{product.id}</div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="space-y-4">
                                        {product.reviews && product.reviews.length > 0 ? (
                                            product.reviews.map((review, index) => (
                                                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="flex items-center gap-1 text-amber-500">
                                                            <IoStar className="text-sm" />
                                                            <span className="text-sm font-medium">{review.rating}</span>
                                                        </div>
                                                        <span className="text-sm text-gray-600">•</span>
                                                        <span className="text-sm text-gray-500">{review.reviewerName}</span>
                                                    </div>
                                                    <p className="text-gray-700 text-sm">{review.comment}</p>
                                                    <span className="text-xs text-gray-400">{review.date}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">Hozircha sharhlar mavjud emas</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}