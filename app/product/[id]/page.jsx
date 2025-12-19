'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { IoCartOutline, IoHeartOutline, IoHeart, IoStar, IoChevronBack, IoShareSocialOutline } from 'react-icons/io5'
import { FiShoppingBag, FiMinus, FiPlus, FiShare2, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi'
import { useCart } from '../../../context/CartContext'
import { useFavorites } from '../../../context/FavoritesContext'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ProductDetail() {
    const params = useParams()
    const router = useRouter()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('description')
    const [relatedProducts, setRelatedProducts] = useState([])
    const [relatedLoading, setRelatedLoading] = useState(false)

    const { addToCart } = useCart()
    const { toggleFavorite, isFavorite } = useFavorites()

    useEffect(() => {
        if (params.id) {
            fetchProduct()
            fetchRelatedProducts()
        }
    }, [params.id])

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`https://dummyjson.com/products/${params.id}`)
            setProduct(response.data)
        } catch (error) {
            console.error('Error fetching product:', error)
            toast.error('Mahsulotni yuklashda xatolik yuz berdi')
        } finally {
            setLoading(false)
        }
    }

    const fetchRelatedProducts = async () => {
        try {
            setRelatedLoading(true)
            const response = await axios.get(`https://dummyjson.com/products/category/${product?.category || 'smartphones'}?limit=4`)
            setRelatedProducts(response.data.products || [])
        } catch (error) {
            console.error('Error fetching related products:', error)
        } finally {
            setRelatedLoading(false)
        }
    }

    const handleAddToCart = () => {
        if (product) {
            toast.success(
                `${quantity} ta "${product.title}" savatga qo'shildi!`,
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
            setQuantity(1)
        }
    }

    const handleToggleFavorite = () => {
        if (product) {
            const wasFavorite = isFavorite(product.id)

            if (wasFavorite) {
                toast(
                    `"${product.title}" sevimlilardan o'chirildi`,
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
                    `"${product.title}" sevimlilarga qo'shildi!`,
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

    const shareProduct = async () => {
        const productUrl = `${window.location.origin}/product/${product.id}`
        const shareText = `${product.title} - ${formatPrice(getDiscountedPrice())} $`

        if (navigator.share && navigator.canShare && navigator.canShare({ text: shareText })) {
            try {
                await navigator.share({
                    title: product.title,
                    text: shareText,
                    url: productUrl,
                })
            } catch (error) {
                console.log('Sharing cancelled:', error)
            }
        } else {
            // Fallback for desktop and browsers without Web Share API
            navigator.clipboard.writeText(productUrl)
            toast.success('Link nusxalandi!', {
                duration: 2000,
                icon: '📋',
                style: {
                    borderRadius: '10px',
                    background: '#3b82f6',
                    color: '#fff',
                },
            })
        }
    }

    const handleBuyNow = () => {
        if (product) {
            handleAddToCart()
            setTimeout(() => {
                router.push('/xaridlarim')
            }, 500)
        }
    }

    // Generate stars for rating
    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<IoStar key={i} className="text-amber-500 fill-amber-500" />)
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <IoStar className="text-gray-300 absolute" />
                        <IoStar className="text-amber-500 fill-amber-500" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                    </div>
                )
            } else {
                stars.push(<IoStar key={i} className="text-gray-300" />)
            }
        }
        return stars
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
                    <div className="text-6xl mb-4">😔</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Mahsulot topilmadi</h2>
                    <p className="text-gray-600 mb-6">Iltimos, boshqa mahsulotni ko'ring</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                        Bosh sahifaga qaytish
                    </button>
                </div>
            </div>
        )
    }

    const discountedPrice = getDiscountedPrice()
    const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail]
    const isFavoriteProduct = isFavorite(product.id)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                        >
                            <IoChevronBack className="text-lg group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Orqaga</span>
                        </button>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={shareProduct}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                            >
                                <IoShareSocialOutline className="text-lg group-hover:scale-110 transition-transform" />
                                <span className="hidden sm:inline font-medium">Ulashish</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="relative">
                                <img
                                    src={images[selectedImage]}
                                    alt={product.title}
                                    className="w-full h-96 object-contain rounded-lg bg-gray-50"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = '/placeholder-image.jpg'
                                    }}
                                />
                                {product.discountPercentage > 0 && (
                                    <div className='absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg'>
                                        -{Math.round(product.discountPercentage)}%
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-24 h-24 bg-white rounded-lg border-2 overflow-hidden transition-all ${selectedImage === index
                                            ? 'border-orange-500 shadow-md scale-105'
                                            : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.title} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = '/placeholder-image.jpg'
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Product Features */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <FiTruck className="text-green-600 text-lg" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800 text-sm">Tez yetkazib berish</h4>
                                        <p className="text-xs text-gray-500">1-3 kun ichida</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FiShield className="text-blue-600 text-lg" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800 text-sm">Kafolat</h4>
                                        <p className="text-xs text-gray-500">2 yilgacha</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <FiRefreshCw className="text-purple-600 text-lg" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800 text-sm">Qaytarish</h4>
                                        <p className="text-xs text-gray-500">30 kun ichida</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                            {product.category}
                                        </span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                            {product.brand}
                                        </span>
                                    </div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                        {product.title}
                                    </h1>
                                </div>
                                <button
                                    onClick={handleToggleFavorite}
                                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all transform hover:scale-110 ${isFavoriteProduct
                                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-200'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {isFavoriteProduct ? <IoHeart className="text-xl" /> : <IoHeartOutline className="text-xl" />}
                                </button>
                            </div>

                            {/* Rating */}
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-full">
                                    <div className="flex items-center gap-1">
                                        {renderStars(product.rating)}
                                    </div>
                                    <span className="font-semibold text-amber-700">{product.rating}</span>
                                    <span className="text-gray-500 text-sm">
                                        ({product.reviews?.length || Math.floor(Math.random() * 1000)})
                                    </span>
                                </div>
                                <span className="text-gray-500 hidden sm:inline">•</span>
                                <span className="text-green-600 font-medium flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    {product.stock} ta qoldi
                                </span>
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
                                            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
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
                                            disabled={quantity <= 1}
                                            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${quantity <= 1
                                                ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                                                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            <FiMinus className="text-sm" />
                                        </button>
                                        <span className="font-bold text-gray-800 text-xl min-w-8 text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={increaseQuantity}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-orange-300 transition-colors"
                                        >
                                            <FiPlus className="text-sm" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        onClick={handleAddToCart}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-95"
                                    >
                                        <IoCartOutline className="text-xl group-hover:scale-110 transition-transform" />
                                        Savatga ({quantity})
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-gray-200 transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-95"
                                    >
                                        <FiShoppingBag className="text-xl group-hover:scale-110 transition-transform" />
                                        Sotib olish
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                            {/* Tab Headers */}
                            <div className="border-b border-gray-200">
                                <div className="flex overflow-x-auto">
                                    <button
                                        onClick={() => setActiveTab('description')}
                                        className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap min-w-[120px] ${activeTab === 'description'
                                            ? 'text-orange-500 border-b-2 border-orange-500'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Tavsif
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('specifications')}
                                        className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap min-w-[120px] ${activeTab === 'specifications'
                                            ? 'text-orange-500 border-b-2 border-orange-500'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Xususiyatlar
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap min-w-[120px] ${activeTab === 'reviews'
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
                                    <div className="space-y-4">
                                        <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>

                                        {/* Key Features */}
                                        {product.features && product.features.length > 0 && (
                                            <div className="mt-6">
                                                <h4 className="font-semibold text-gray-900 mb-3">Asosiy xususiyatlar:</h4>
                                                <ul className="space-y-2">
                                                    {product.features.map((feature, index) => (
                                                        <li key={index} className="flex items-start gap-3">
                                                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                                            <span className="text-gray-700">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'specifications' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-600 mb-1">Brend</div>
                                                <div className="font-medium text-gray-900">{product.brand}</div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-600 mb-1">Kategoriya</div>
                                                <div className="font-medium text-gray-900">{product.category}</div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-600 mb-1">Qoldiq</div>
                                                <div className="font-medium text-gray-900">{product.stock} ta</div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-600 mb-1">SKU</div>
                                                <div className="font-medium text-gray-900">{product.id}</div>
                                            </div>
                                        </div>

                                        {/* Additional specifications */}
                                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                                            <div className="mt-6">
                                                <h4 className="font-semibold text-gray-900 mb-3">Texnik xususiyatlar:</h4>
                                                <div className="space-y-3">
                                                    {Object.entries(product.specifications).map(([key, value]) => (
                                                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                                                            <span className="text-gray-600">{key}</span>
                                                            <span className="font-medium text-gray-900">{value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    {renderStars(product.rating)}
                                                    <span className="font-semibold text-gray-900">{product.rating}/5</span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {product.reviews?.length || 0} ta sharh asosida
                                                </p>
                                            </div>
                                            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                                                Sharh qoldirish
                                            </button>
                                        </div>

                                        {product.reviews && product.reviews.length > 0 ? (
                                            <div className="space-y-4">
                                                {product.reviews.map((review, index) => (
                                                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <h5 className="font-medium text-gray-900 mb-1">{review.reviewerName}</h5>
                                                                <div className="flex items-center gap-2">
                                                                    {renderStars(review.rating)}
                                                                    <span className="text-sm text-gray-500">{review.date}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-700">{review.comment}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <div className="text-5xl mb-3">💬</div>
                                                <p className="text-gray-500 font-medium">Hozircha sharhlar mavjud emas</p>
                                                <p className="text-sm text-gray-400 mt-1">Birinchi sharhni siz qoldiring!</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Related Products */}
                        {relatedProducts.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">O'xshash mahsulotlar</h3>
                                {relatedLoading ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="animate-pulse">
                                                <div className="h-32 bg-gray-200 rounded-lg mb-2"></div>
                                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {relatedProducts.map((relatedProduct) => (
                                            <Link
                                                key={relatedProduct.id}
                                                href={`/product/${relatedProduct.id}`}
                                                className="group bg-gray-50 rounded-xl p-3 hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-200"
                                            >
                                                <div className="relative mb-2">
                                                    <img
                                                        src={relatedProduct.thumbnail}
                                                        alt={relatedProduct.title}
                                                        className="w-full h-32 object-contain rounded-lg bg-white p-2"
                                                    />
                                                    {relatedProduct.discountPercentage > 0 && (
                                                        <div className="absolute top-1 right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                                                            -{Math.round(relatedProduct.discountPercentage)}%
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-orange-600 mb-1">
                                                    {relatedProduct.title}
                                                </h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-bold text-gray-900">
                                                        {formatPrice(Math.round(relatedProduct.price * (1 - (relatedProduct.discountPercentage || 0) / 100)))} $
                                                    </span>
                                                    {relatedProduct.discountPercentage > 0 && (
                                                        <span className="text-sm text-gray-400 line-through">
                                                            {formatPrice(relatedProduct.price)} $
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}