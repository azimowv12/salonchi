'use client'
import React, { useState, useEffect } from 'react'
import {
    IoTimeOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoLocationOutline,
    IoCallOutline,
    IoMailOutline,
    IoCartOutline,
    IoArrowBack,
    IoPersonOutline,
    IoPrintOutline,
    IoDownloadOutline,
    IoShareSocialOutline,
    IoEllipsisVertical,
    IoSearchOutline,
    IoFilterOutline,
    IoCalendarOutline,
    IoEyeOutline,
    IoTrashOutline,
    IoRefreshOutline
} from 'react-icons/io5'
import {
    FiPackage,
    FiTruck,
    FiCheckCircle,
    FiChevronDown,
    FiChevronUp
} from 'react-icons/fi'
import Link from 'next/link'

export default function XaridlarimPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedOrder, setExpandedOrder] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [sortBy, setSortBy] = useState('newest')
    const [selectedOrders, setSelectedOrders] = useState([])
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [orderToDelete, setOrderToDelete] = useState(null)

    useEffect(() => {
        // LocalStorage dan buyurtmalarni olish
        const savedOrders = JSON.parse(localStorage.getItem('myOrders') || '[]')
        setOrders(savedOrders)
        setLoading(false)
    }, [])

    // Filtered and sorted orders
    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = filterStatus === 'all' || order.status === filterStatus

        return matchesSearch && matchesStatus
    }).sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.date) - new Date(a.date)
            case 'oldest':
                return new Date(a.date) - new Date(b.date)
            case 'price-high':
                return b.total - a.total
            case 'price-low':
                return a.total - b.total
            default:
                return new Date(b.date) - new Date(a.date)
        }
    })

    // Buyurtma holati ranglari
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-50 text-green-700 border-green-200'
            case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200'
            case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-200'
            case 'cancelled': return 'bg-red-50 text-red-700 border-red-200'
            default: return 'bg-gray-50 text-gray-700 border-gray-200'
        }
    }

    // Buyurtma holati ikonkasi
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <IoCheckmarkCircleOutline className="text-green-600 text-lg" />
            case 'processing': return <IoTimeOutline className="text-blue-600 text-lg" />
            case 'shipped': return <FiTruck className="text-purple-600 text-lg" />
            case 'cancelled': return <IoCloseCircleOutline className="text-red-600 text-lg" />
            default: return <FiPackage className="text-gray-600 text-lg" />
        }
    }

    // Buyurtma holati matni
    const getStatusText = (status) => {
        switch (status) {
            case 'processing': return 'Jarayonda'
            case 'completed': return 'Yakunlandi'
            case 'shipped': return 'Yetkazilmoqda'
            case 'cancelled': return 'Bekor qilindi'
            default: return 'Kutilmoqda'
        }
    }

    // Sana formatlash
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(Math.round(price || 0))
    }

    // Toggle order expansion
    const toggleOrderExpansion = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId)
    }

    // Toggle order selection
    const toggleOrderSelection = (orderId) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        )
    }

    // Select all orders
    const selectAllOrders = () => {
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([])
        } else {
            setSelectedOrders(filteredOrders.map(order => order.id))
        }
    }

    // Order status update
    const updateOrderStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        )
        setOrders(updatedOrders)
        localStorage.setItem('myOrders', JSON.stringify(updatedOrders))
    }

    // Order delete function
    const deleteOrder = (orderId) => {
        const updatedOrders = orders.filter(order => order.id !== orderId)
        setOrders(updatedOrders)
        localStorage.setItem('myOrders', JSON.stringify(updatedOrders))
        setShowDeleteConfirm(false)
        setOrderToDelete(null)
        setSelectedOrders(prev => prev.filter(id => id !== orderId))
    }

    // Delete selected orders
    const deleteSelectedOrders = () => {
        const updatedOrders = orders.filter(order => !selectedOrders.includes(order.id))
        setOrders(updatedOrders)
        localStorage.setItem('myOrders', JSON.stringify(updatedOrders))
        setSelectedOrders([])
    }

    // Stats calculation
    const stats = {
        total: orders.length,
        processing: orders.filter(o => o.status === 'processing').length,
        completed: orders.filter(o => o.status === 'completed').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
        totalAmount: orders.reduce((sum, order) => sum + order.total, 0)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Buyurtmalar yuklanmoqda</h2>
                    <p className="text-gray-500">Iltimos, kuting...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <IoCloseCircleOutline className="text-red-600 text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Buyurtmani o'chirish</h3>
                                <p className="text-gray-600 text-sm">Bu amalni ortga qaytarib bo'lmaydi</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-6">
                            Rostdan <span className="font-bold text-red-600">{orderToDelete}</span> raqamli buyurtmani o'chirmoqchimisiz?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteConfirm(false)
                                    setOrderToDelete(null)
                                }}
                                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={() => deleteOrder(orderToDelete)}
                                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                O'chirish
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header with Stats */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="p-3 hover:bg-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md bg-white"
                            >
                                <IoArrowBack className="text-2xl text-gray-700" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Mening xaridlarim</h1>
                                <p className="text-gray-600">Barcha buyurtmalaringizni boshqaring</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                                    <div className="text-sm text-gray-500">Jami</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
                                    <div className="text-sm text-gray-500">Yakunlangan</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">{stats.processing}</div>
                                    <div className="text-sm text-gray-500">Jarayonda</div>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <IoCartOutline className="text-white text-2xl" />
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Jami summa</p>
                                    <div className="text-2xl font-bold text-gray-900 mt-1">
                                        {formatPrice(stats.totalAmount)} $
                                    </div>
                                </div>
                                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                                    <span className="text-orange-600 font-bold">$</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Yakunlangan</p>
                                    <div className="text-2xl font-bold text-green-600 mt-1">
                                        {stats.completed}
                                    </div>
                                </div>
                                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                    <IoCheckmarkCircleOutline className="text-green-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Jarayonda</p>
                                    <div className="text-2xl font-bold text-blue-600 mt-1">
                                        {stats.processing}
                                    </div>
                                </div>
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <IoTimeOutline className="text-blue-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Yetkazilmoqda</p>
                                    <div className="text-2xl font-bold text-purple-600 mt-1">
                                        {stats.shipped}
                                    </div>
                                </div>
                                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                    <FiTruck className="text-purple-600 text-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Bekor qilingan</p>
                                    <div className="text-2xl font-bold text-red-600 mt-1">
                                        {stats.cancelled}
                                    </div>
                                </div>
                                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                    <IoCloseCircleOutline className="text-red-600 text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                    <input
                                        type="text"
                                        placeholder="Buyurtma raqami, ism, email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap gap-3">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                >
                                    <option value="all">Barcha holatlar</option>
                                    <option value="processing">Jarayonda</option>
                                    <option value="shipped">Yetkazilmoqda</option>
                                    <option value="completed">Yakunlangan</option>
                                    <option value="cancelled">Bekor qilingan</option>
                                </select>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                >
                                    <option value="newest">Yangi - eski</option>
                                    <option value="oldest">Eski - yangi</option>
                                    <option value="price-high">Yuqori narx</option>
                                    <option value="price-low">Past narx</option>
                                </select>

                                {selectedOrders.length > 0 && (
                                    <button
                                        onClick={deleteSelectedOrders}
                                        className="px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                                    >
                                        <IoTrashOutline />
                                        Tanlanganlarni o'chirish ({selectedOrders.length})
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {orders.length === 0 ? (
                    // Empty state
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto border border-gray-200">
                        <div className="w-32 h-32 bg-gradient-to-br from-orange-50 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiPackage className="text-5xl text-orange-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Xaridlar mavjud emas</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
                            Hozircha sizda hech qanday buyurtma mavjud emas.
                            Mahsulotlar sahifasiga o'tib, birinchi xaridingizni amalga oshiring.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                <IoArrowBack />
                                Asosiy sahifa
                            </Link>
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
                            >
                                <IoCartOutline />
                                Mahsulotlar
                            </Link>
                        </div>
                    </div>
                ) : (
                    // Orders list
                    <>
                        {/* Bulk actions */}
                        {selectedOrders.length > 0 && (
                            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-blue-600 font-bold">{selectedOrders.length}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700">{selectedOrders.length} ta buyurtma tanlandi</p>
                                            <p className="text-sm text-gray-500">Amallarni tanlang yoki tanlovni bekor qiling</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setSelectedOrders([])}
                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Bekor qilish
                                        </button>
                                        <button
                                            onClick={deleteSelectedOrders}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
                                        >
                                            <IoTrashOutline />
                                            O'chirish
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            {filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className={`bg-white rounded-2xl shadow-sm overflow-hidden border transition-all duration-300 ${selectedOrders.includes(order.id) ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-200 hover:shadow-lg'}`}
                                >
                                    {/* Order header */}
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedOrders.includes(order.id)}
                                                        onChange={() => toggleOrderSelection(order.id)}
                                                        className="w-5 h-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                                                    />
                                                    <div className="flex items-center gap-3">
                                                        <div className={`px-4 py-2 rounded-xl border ${getStatusColor(order.status)} flex items-center gap-2`}>
                                                            {getStatusIcon(order.status)}
                                                            <span className="font-medium">{getStatusText(order.status)}</span>
                                                        </div>
                                                        <div className="text-lg font-bold text-gray-900 font-mono">
                                                            #{order.id.split('-')[1]}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <IoCalendarOutline className="text-gray-400" />
                                                        <span>{formatDate(order.date)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <IoPersonOutline className="text-gray-400" />
                                                        <span>{order.customerInfo.firstName} {order.customerInfo.lastName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-400">•</span>
                                                        <span>{order.items.length} ta mahsulot</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                <div className="text-right">
                                                    <div className="text-3xl font-bold text-gray-900 mb-1">
                                                        {formatPrice(order.total)} $
                                                    </div>
                                                    <p className="text-sm text-gray-500">Jami to'lov</p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => toggleOrderExpansion(order.id)}
                                                        className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                                                    >
                                                        {expandedOrder === order.id ?
                                                            <FiChevronUp className="text-xl text-gray-600" /> :
                                                            <FiChevronDown className="text-xl text-gray-600" />
                                                        }
                                                    </button>
                                                    <div className="relative group">
                                                        <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                                                            <IoEllipsisVertical className="text-xl text-gray-600" />
                                                        </button>
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10 hidden group-hover:block">
                                                            <button
                                                                onClick={() => updateOrderStatus(order.id, 'processing')}
                                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                                            >
                                                                <IoTimeOutline className="text-blue-500" />
                                                                Jarayonga o'tkazish
                                                            </button>
                                                            <button
                                                                onClick={() => updateOrderStatus(order.id, 'shipped')}
                                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                                            >
                                                                <FiTruck className="text-purple-500" />
                                                                Yetkazishga belgilash
                                                            </button>
                                                            <button
                                                                onClick={() => updateOrderStatus(order.id, 'completed')}
                                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                                            >
                                                                <IoCheckmarkCircleOutline className="text-green-500" />
                                                                Yakunlash
                                                            </button>
                                                            <button
                                                                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                                            >
                                                                <IoCloseCircleOutline className="text-red-500" />
                                                                Bekor qilish
                                                            </button>
                                                            <div className="border-t my-2"></div>
                                                            <button
                                                                onClick={() => {
                                                                    setOrderToDelete(order.id)
                                                                    setShowDeleteConfirm(true)
                                                                }}
                                                                className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 text-sm"
                                                            >
                                                                <IoTrashOutline />
                                                                O'chirish
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded details */}
                                    {expandedOrder === order.id && (
                                        <div className="border-t border-gray-100 p-6 bg-gray-50">
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                {/* Customer info */}
                                                <div className="lg:col-span-2">
                                                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                                                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                            <IoPersonOutline className="text-orange-500" />
                                                            Mijoz ma'lumotlari
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Ism Familiya</p>
                                                                    <p className="font-medium text-gray-900">
                                                                        {order.customerInfo.firstName} {order.customerInfo.lastName}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Telefon</p>
                                                                    <p className="font-medium text-gray-900 flex items-center gap-2">
                                                                        <IoCallOutline className="text-gray-400" />
                                                                        {order.customerInfo.phone}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Email</p>
                                                                    <p className="font-medium text-gray-900 flex items-center gap-2">
                                                                        <IoMailOutline className="text-gray-400" />
                                                                        {order.customerInfo.email}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Manzil</p>
                                                                    <p className="font-medium text-gray-900 flex items-center gap-2">
                                                                        <IoLocationOutline className="text-gray-400" />
                                                                        {order.customerInfo.city}, {order.customerInfo.address}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Products list */}
                                                    <div className="mt-6 bg-white rounded-xl p-5 border border-gray-200">
                                                        <h3 className="font-semibold text-gray-800 mb-4">Buyurtma tarkibi</h3>
                                                        <div className="space-y-4">
                                                            {order.items.map((item, index) => (
                                                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                                    <img
                                                                        src={item.thumbnail}
                                                                        alt={item.title}
                                                                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                                                                    />
                                                                    <div className="flex-1">
                                                                        <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                                                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                                            <span className="bg-white px-3 py-1 rounded-lg border">
                                                                                Miqdor: {item.quantity}
                                                                            </span>
                                                                            <span className={item.discountPercentage > 0 ? 'line-through text-gray-400' : 'text-gray-700'}>
                                                                                Narxi: {formatPrice(item.price)} $
                                                                            </span>
                                                                            {item.discountPercentage > 0 && (
                                                                                <span className="text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                                                                                    Chegirma: {item.discountPercentage}%
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="text-xl font-bold text-gray-900">
                                                                            {formatPrice(item.price * item.quantity)} $
                                                                        </div>
                                                                        {item.discountPercentage > 0 && (
                                                                            <div className="text-sm text-green-600 mt-1">
                                                                                Tejandi: {formatPrice(item.price * item.discountPercentage / 100 * item.quantity)} $
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Order summary */}
                                                <div className="space-y-6">
                                                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                                                        <h3 className="font-semibold text-gray-800 mb-4">Buyurtma xulosasi</h3>
                                                        <div className="space-y-3">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-gray-600">Mahsulotlar:</span>
                                                                <span className="font-medium">{order.items.length} ta</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-gray-600">Yetkazib berish:</span>
                                                                <span className="font-medium text-green-600">{order.deliveryMethod}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-gray-600">To'lov usuli:</span>
                                                                <span className="font-medium">{order.paymentMethod}</span>
                                                            </div>
                                                            <div className="border-t pt-3">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-lg font-bold text-gray-900">Jami:</span>
                                                                    <span className="text-2xl font-bold text-orange-600">{formatPrice(order.total)} $</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                                                        <h3 className="font-semibold text-gray-800 mb-4">Amallar</h3>
                                                        <div className="space-y-3">
                                                            <button className="w-full py-3 border-2 border-orange-500 text-orange-500 rounded-xl font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                                                                <IoPrintOutline />
                                                                Chop etish
                                                            </button>
                                                            <button className="w-full py-3 border-2 border-blue-500 text-blue-500 rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                                                                <IoDownloadOutline />
                                                                Yuklab olish
                                                            </button>
                                                            <button className="w-full py-3 border-2 border-green-500 text-green-500 rounded-xl font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                                                                <IoShareSocialOutline />
                                                                Ulashish
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Notes */}
                                                    {order.customerInfo.notes && (
                                                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
                                                            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                                                <IoMailOutline />
                                                                Qo'shimcha izoh
                                                            </h3>
                                                            <p className="text-blue-700 bg-white/50 p-3 rounded-lg">
                                                                {order.customerInfo.notes}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}