'use client'
import React, { useState, useEffect, useRef } from 'react'
import { IoClose, IoCartOutline, IoTrashOutline, IoPersonOutline, IoMailOutline, IoLocationOutline, IoCallOutline, IoCheckmarkCircleOutline, IoArrowForward } from 'react-icons/io5'
import { FiMinus, FiPlus, FiArrowUp } from 'react-icons/fi'
import { useCart } from './CartContext'
import { useRouter } from 'next/navigation'

export default function Cart({ isOpen, onClose }) {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [showScrollTop, setShowScrollTop] = useState(false)
    const [showCheckoutForm, setShowCheckoutForm] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: '',
        deliveryMethod: 'standart',
        paymentMethod: 'cash'
    })
    const [formErrors, setFormErrors] = useState({})
    const router = useRouter()
    const checkoutFormRef = useRef(null)

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

    // Modal ochilganda formani scroll qilish
    useEffect(() => {
        if (showCheckoutForm && checkoutFormRef.current) {
            setTimeout(() => {
                checkoutFormRef.current.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }, [showCheckoutForm])

    // Scroll to top function
    const scrollToTop = () => {
        const cartContent = document.querySelector('.cart-content')
        if (cartContent) {
            cartContent.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    // Format price
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

    // Form maydonlarini yangilash
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Xatoliklarni tozalash
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    // Form validatsiyasi
    const validateForm = () => {
        const errors = {}

        if (!formData.firstName.trim()) errors.firstName = 'Ismni kiriting'
        if (!formData.lastName.trim()) errors.lastName = 'Familiyani kiriting'
        if (!formData.email.trim()) {
            errors.email = 'Elektron pochtani kiriting'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Noto\'g\'ri elektron pochta formati'
        }
        if (!formData.phone.trim()) errors.phone = 'Telefon raqamini kiriting'
        if (!formData.address.trim()) errors.address = 'Manzilni kiriting'
        if (!formData.city.trim()) errors.city = 'Shaharni tanlang'
        if (!formData.postalCode.trim()) errors.postalCode = 'Indeksni kiriting'

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    // Buyurtma berish
    const handleCheckout = () => {
        setShowCheckoutForm(true)
    }

    // Buyurtmani tasdiqlash
    const handleSubmitOrder = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsCheckingOut(true)

        try {
            // Order ID yaratish
            const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

            // Buyurtma ma'lumotlarini tayyorlash
            const orderData = {
                id: orderId,
                items: [...cartItems], // Mahsulotlarni nusxalash
                customerInfo: { ...formData },
                date: new Date().toISOString(),
                status: 'processing',
                total: getCartTotal(),
                deliveryMethod: formData.deliveryMethod,
                paymentMethod: formData.paymentMethod
            }

            // LocalStorage dan oldingi buyurtmalarni olish
            const existingOrders = JSON.parse(localStorage.getItem('myOrders') || '[]')

            // Yangi buyurtmani qo'shish
            const updatedOrders = [orderData, ...existingOrders]

            // LocalStorage ga saqlash
            localStorage.setItem('myOrders', JSON.stringify(updatedOrders))

            // Kechikish simulyatsiyasi
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Modalni yopish
            setShowCheckoutForm(false)

            // Savatni tozalash
            clearCart()

            // Formani tozalash
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                postalCode: '',
                notes: '',
                deliveryMethod: 'standart',
                paymentMethod: 'cash'
            })

            // Cart modalini yopish
            if (onClose) {
                onClose()
            }

            // Muvaffaqiyatli xabar
            alert(`✅ Buyurtma muvaffaqiyatli qabul qilindi!\n\nBuyurtma raqami: ${orderId}\nJami summa: ${formatPrice(getCartTotal())} $\n\nEndi "Xaridlarim" sahifasiga o'tishingiz mumkin.`)

            // Xaridlarim sahifasiga o'tish tugmasini ko'rsatish
            setTimeout(() => {
                router.push('/xaridlarim')
            }, 500)

        } catch (error) {
            console.error('Buyurtma berishda xatolik:', error)
            alert('❌ Buyurtma berishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.')
        } finally {
            setIsCheckingOut(false)
        }
    }

    // Shaharlar ro'yxati
    const cities = [
        'Toshkent', 'Samarqand', 'Buxoro', 'Andijon',
        'Namangan', 'Farg\'ona', 'Qarshi', 'Nukus'
    ]

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Orqa fon */}
            <div
                className="absolute inset-0 bg-opacity-50 transition-opacity"
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
                        // Mahsulotlar ro'yxati va Checkout form
                        <div className="space-y-4">
                            {!showCheckoutForm ? (
                                // Mahsulotlar ro'yxati
                                <>
                                    {cartItems.map((item) => {
                                        const discountPrice = getDiscountedPrice(item)
                                        const itemTotal = discountPrice * item.quantity
                                        const originalTotal = item.price * item.quantity
                                        const savedAmount = originalTotal - itemTotal

                                        return (
                                            <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                                                />

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
                                                        <div className="space-y-1">
                                                            <div className="text-lg font-bold text-gray-900">
                                                                {formatPrice(discountPrice)} $
                                                            </div>
                                                            {item.discountPercentage > 0 && (
                                                                <div className="text-sm text-gray-400 line-through">
                                                                    {formatPrice(item.price)} $
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2 border border-gray-200 shadow-sm">
                                                            <button
                                                                onClick={() => decreaseQuantity(item.id)}
                                                                disabled={item.quantity <= 1}
                                                                className={`w-6 h-6 flex items-center justify-center rounded-lg transition-all ${item.quantity <= 1
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

                                    <div className="h-20"></div>
                                </>
                            ) : (
                                // Checkout form
                                <div ref={checkoutFormRef} className="pb-24">
                                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 mb-6 text-white">
                                        <div className="flex items-center gap-3 mb-2">
                                            <IoCheckmarkCircleOutline className="text-2xl" />
                                            <h3 className="text-lg font-bold">Buyurtma ma'lumotlari</h3>
                                        </div>
                                        <p className="text-sm opacity-90">Iltimos, barcha maydonlarni to'ldiring</p>
                                    </div>

                                    <form onSubmit={handleSubmitOrder} className="space-y-4">
                                        {/* Ism va Familiya */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <IoPersonOutline className="inline mr-1" />
                                                    Ism *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                    placeholder="Ismingiz"
                                                />
                                                {formErrors.firstName && (
                                                    <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Familiya *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                    placeholder="Familiyangiz"
                                                />
                                                {formErrors.lastName && (
                                                    <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Email va Telefon */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <IoMailOutline className="inline mr-1" />
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                    placeholder="email@example.com"
                                                />
                                                {formErrors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <IoCallOutline className="inline mr-1" />
                                                    Telefon *
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                    placeholder="+998 XX XXX XX XX"
                                                />
                                                {formErrors.phone && (
                                                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Shahar va Indeks */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Shahar *
                                                </label>
                                                <select
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                >
                                                    <option value="">Shaharni tanlang</option>
                                                    {cities.map(city => (
                                                        <option key={city} value={city}>{city}</option>
                                                    ))}
                                                </select>
                                                {formErrors.city && (
                                                    <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Indeks *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="postalCode"
                                                    value={formData.postalCode}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.postalCode ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                    placeholder="100000"
                                                />
                                                {formErrors.postalCode && (
                                                    <p className="text-red-500 text-sm mt-1">{formErrors.postalCode}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Manzil */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <IoLocationOutline className="inline mr-1" />
                                                To'liq manzil *
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-lg border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                placeholder="Ko'cha, uy, kvartira"
                                            />
                                            {formErrors.address && (
                                                <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                                            )}
                                        </div>

                                        {/* Yetkazib berish va To'lov usuli */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Yetkazib berish
                                                </label>
                                                <select
                                                    name="deliveryMethod"
                                                    value={formData.deliveryMethod}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                >
                                                    <option value="standart">Standart (3-5 kun)</option>
                                                    <option value="express">Express (1-2 kun)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    To'lov usuli
                                                </label>
                                                <select
                                                    name="paymentMethod"
                                                    value={formData.paymentMethod}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                >
                                                    <option value="cash">Naqd yetkazilganda</option>
                                                    <option value="card">Karta orqali</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Qo'shimcha izoh */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Qo'shimcha izoh (ixtiyoriy)
                                            </label>
                                            <textarea
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Yetkazib berishga oid qo'shimcha ma'lumotlar..."
                                            />
                                        </div>
                                    </form>
                                </div>
                            )}
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
                        {!showCheckoutForm ? (
                            // Asosiy footer (buyurtma berishdan oldin)
                            <>
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

                                <div className="flex justify-between items-center mb-6 py-4 border-y border-gray-200">
                                    <span className="text-lg font-bold text-gray-900">Jami to'lov:</span>
                                    <span className="text-2xl font-bold text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                                        {formatPrice(getCartTotal())} $
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        Buyurtma berish - {formatPrice(getCartTotal())} $
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
                            </>
                        ) : (
                            // Checkout form footer (buyurtma tasdiqlash)
                            <>
                                <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-700">Jami summa:</span>
                                        <span className="text-2xl font-bold text-orange-600">{formatPrice(getCartTotal())} $</span>
                                    </div>
                                    <p className="text-sm text-gray-500 text-center">* bilan belgilangan maydonlar to'ldirilishi shart</p>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        onClick={handleSubmitOrder}
                                        disabled={isCheckingOut}
                                        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${isCheckingOut
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg text-white hover:scale-105 active:scale-95'
                                            }`}
                                    >
                                        {isCheckingOut ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Tasdiqlanmoqda...
                                            </>
                                        ) : (
                                            <>
                                                <IoCheckmarkCircleOutline className="text-xl" />
                                                Buyurtmani tasdiqlash
                                            </>
                                        )}
                                    </button>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowCheckoutForm(false)}
                                            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
                                        >
                                            Orqaga
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => router.push('/xaridlarim')}
                                            className="flex-1 py-3 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Xaridlarim
                                            <IoArrowForward />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}