'use client'
import React, { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Iltimos, barcha maydonlarni to\'ldiring!')
            return
        }

        toast.success('Xabaringiz yuborildi!')
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Aloqa</h1>
                <p className="text-gray-600">Biz bilan bog'lanish uchun quyidagi formani to'ldiring</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Kontakt ma'lumotlari */}
                <div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                                <FaPhone />
                            </div>
                            <div>
                                <h3 className="font-medium">Telefon</h3>
                                <p className="text-gray-600 text-sm">+998 90 123 45 67</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                            <div className="p-2 bg-red-100 text-red-600 rounded-full">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h3 className="font-medium">Email</h3>
                                <p className="text-gray-600 text-sm">info@example.uz</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                            <div className="p-2 bg-green-100 text-green-600 rounded-full">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h3 className="font-medium">Manzil</h3>
                                <p className="text-gray-600 text-sm">Toshkent shahri</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Forma */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ismingiz
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Xabar
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaPaperPlane />
                            Yuborish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}