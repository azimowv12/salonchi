"use client";
import React, { useState } from 'react';
import { useCartStore } from './CartStore';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Trash2, Plus, Minus, User, Mail, MapPin, Phone, X } from 'lucide-react';

export default function Sav() {
    const cartItems = useCartStore((state) => state.cartItems);
    const purchaseCart = useCartStore((state) => state.purchaseCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const router = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: ''
    });
    const [formErrors, setFormErrors] = useState({});

    // Form maydonlarini yangilash
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Xatoliklarni tozalash
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Form validatsiyasi
    const validateForm = () => {
        const errors = {};

        if (!formData.firstName.trim()) errors.firstName = 'Ismni kiriting';
        if (!formData.lastName.trim()) errors.lastName = 'Familiyani kiriting';
        if (!formData.email.trim()) {
            errors.email = 'Elektron pochtani kiriting';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Noto\'g\'ri elektron pochta formati';
        }

        if (!formData.phone.trim()) errors.phone = 'Telefon raqamini kiriting';
        if (!formData.address.trim()) errors.address = 'Manzilni kiriting';
        if (!formData.city.trim()) errors.city = 'Shaharni kiriting';
        if (!formData.postalCode.trim()) errors.postalCode = 'Indeksni kiriting';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleBuy = async () => {
        // Avval formani ochamiz
        setShowCheckoutModal(true);
    };

    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);
        try {
            // Xaridlarni localStorage ga saqlash
            const purchaseData = cartItems.map(item => ({
                ...item,
                customerInfo: formData,
                purchaseDate: new Date().toISOString(),
                orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                status: 'processing'
            }));

            // Hozirgi xaridlar olinadi
            const existingPurchases = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
            const updatedPurchases = [...existingPurchases, ...purchaseData];

            // Yangi xaridlar qo'shiladi
            localStorage.setItem('purchasedItems', JSON.stringify(updatedPurchases));

            // CartStore dan purchaseCart chaqiriladi
            purchaseCart();

            // Kechikish simulyatsiyasi
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Modalni yopish
            setShowCheckoutModal(false);

            // Formani tozalash
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                postalCode: '',
                notes: ''
            });

            // Xaridlarim sahifasiga yo'naltirish
            router.push('/xaridlarim');

        } catch (error) {
            console.error('Buyurtma berishda xatolik:', error);
            alert('Buyurtma berishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
        } else {
            updateQuantity(id, newQuantity);
        }
    };

    const handleRemoveItem = (id) => {
        if (confirm('Bu mahsulotni savatdan o\'chirmoqchimisiz?')) {
            removeFromCart(id);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (parseFloat(item.price) * (item.quantity || 1));
        }, 0);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('uz-UZ').format(price);
    };

    // Modal komponenti
    const CheckoutModal = () => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Modal header */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Buyurtmani rasmiylashtirish</h2>
                        <p className="text-gray-600 text-sm mt-1">Ma'lumotlaringizni kiriting</p>
                    </div>
                    <button
                        onClick={() => setShowCheckoutModal(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleCheckoutSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Ism */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <User className="w-4 h-4 inline mr-1" />
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

                        {/* Familiya */}
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

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Mail className="w-4 h-4 inline mr-1" />
                                Elektron pochta *
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

                        {/* Telefon */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Phone className="w-4 h-4 inline mr-1" />
                                Telefon raqam *
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

                        {/* Manzil */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <MapPin className="w-4 h-4 inline mr-1" />
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

                        {/* Shahar */}
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
                                <option value="tashkent">Toshkent</option>
                                <option value="samarkand">Samarqand</option>
                                <option value="bukhara">Buxoro</option>
                                <option value="andijon">Andijon</option>
                                <option value="namangan">Namangan</option>
                                <option value="fergana">Farg'ona</option>
                            </select>
                            {formErrors.city && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                            )}
                        </div>

                        {/* Indeks */}
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

                        {/* Qo'shimcha izoh */}
                        <div className="md:col-span-2">
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
                    </div>

                    {/* Order summary in modal */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <h3 className="font-medium text-gray-700 mb-3">Buyurtma haqida:</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Mahsulotlar:</span>
                                <span className="font-medium">{cartItems.length} ta</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Umumiy summa:</span>
                                <span className="font-bold text-orange-600">{formatPrice(calculateTotal())} so'm</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${isProcessing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                            }`}
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Tasdiqlanmoqda...
                            </>
                        ) : (
                            'Buyurtmani tasdiqlash'
                        )}
                    </button>

                    {/* Note */}
                    <p className="text-gray-500 text-sm text-center mt-4">
                        * bilan belgilangan maydonlar to'ldirilishi shart
                    </p>
                </form>
            </div>
        </div>
    );

    if (cartItems.length === 0) {
        return (
            <div className="max-w-2xl mx-auto py-16 text-center">
                <div className="bg-white rounded-2xl shadow-sm p-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Savat</h2>
                    <p className="text-gray-500 mb-8">Savatda mahsulot yo'q.</p>
                    <a
                        href="/products"
                        className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                        Mahsulotlarga o'tish
                    </a>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-6xl mx-auto py-8 px-4">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Savat</h1>
                    <p className="text-gray-600">Sizning savatingizdagi mahsulotlar</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left column - Cart items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow overflow-hidden">
                            <div className="px-6 py-4 border-b">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Mahsulotlar ({cartItems.length} ta)
                                    </h2>
                                    <button
                                        onClick={() => {
                                            if (confirm('Barcha mahsulotlarni o\'chirmoqchimisiz?')) {
                                                clearCart();
                                            }
                                        }}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Savatni tozalash
                                    </button>
                                </div>
                            </div>

                            <div className="divide-y">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex gap-6">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-32 h-32 object-cover rounded-lg shadow"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
                                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                                                        <div className="text-2xl font-bold text-orange-600">
                                                            {formatPrice(item.price)} so'm
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors self-start"
                                                        title="O'chirish"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>

                                                        <span className="text-lg font-medium w-8 text-center">
                                                            {item.quantity || 1}
                                                        </span>

                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>

                                                        <span className="text-gray-500 ml-2">dona</span>
                                                    </div>

                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-gray-800">
                                                            {formatPrice(parseFloat(item.price) * (item.quantity || 1))} so'm
                                                        </div>
                                                        <div className="text-gray-500 text-sm">Umumiy</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow p-6 sticky top-24">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Buyurtma haqida</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Mahsulotlar soni:</span>
                                    <span className="font-medium">{cartItems.length} ta</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Yetkazib berish:</span>
                                    <span className="font-medium text-green-600">Bepul</span>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Jami:</span>
                                        <span className="text-orange-600">{formatPrice(calculateTotal())} so'm</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleBuy}
                                disabled={isProcessing}
                                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${isProcessing
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                                    }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Jarayonda...
                                    </>
                                ) : (
                                    'Buyurtma berish'
                                )}
                            </button>

                            <div className="mt-6 text-center">
                                <a
                                    href="/products"
                                    className="text-orange-500 hover:text-orange-700 font-medium text-sm"
                                >
                                    + Yana mahsulot qo'shish
                                </a>
                            </div>

                            <div className="mt-8 pt-6 border-t">
                                <h3 className="font-medium text-gray-700 mb-3">Xavfsizlik kafolatlari:</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                        <span>Xavfsiz to'lov</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                        <span>14 kun ichida qaytarish huquqi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                        <span>Maxfiylik kafolatlangan</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal window */}
            {showCheckoutModal && <CheckoutModal />}
        </>
    );
}