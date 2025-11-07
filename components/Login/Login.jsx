"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <main className="min-h-screen flex flex-col mt-10 items-center justify-center bg-gray-50 px-4">
            <div className="mb-8">
                <h1 className="text-orange-500 text-left text-3xl font-bold tracking-wide">
                    Salonchi
                </h1>
            </div>

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-center text-2xl font-semibold mb-2">
                    Ro’yxatdan o’tish
                </h2>
                <p className="text-center text-gray-500 text-sm mb-8">
                    Ro’yxatdan o’tish uchun quyidagi ma’lumotlarni to’ldiring
                </p>

                <form className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Familiya va ism
                        </label>
                        <input
                            type="text"
                            placeholder="Familiya va ismingizni kiriting"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {/* Telefon raqam */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Telefon raqami
                        </label>
                        <input
                            type="tel"
                            placeholder="+998"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {/* Parol */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Parol
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Parol yarating"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Parolni tasdiqlash */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Parolni tasdiqlang
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Parolni tasdiqlang"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirm ? (
                                    <FaEyeSlash size={18} />
                                ) : (
                                    <FaEye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Viloyat */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Viloyat
                        </label>
                        <select className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-gray-700">
                            <option value="">Viloyatingizni tanlang</option>
                            <option>Toshkent</option>
                            <option>Andijon</option>
                            <option>Buxoro</option>
                            <option>Farg‘ona</option>
                            <option>Namangan</option>
                            <option>Navoiy</option>
                            <option>Qashqadaryo</option>
                            <option>Samarqand</option>
                            <option>Surxondaryo</option>
                            <option>Sirdaryo</option>
                            <option>Jizzax</option>
                            <option>Xorazm</option>
                            <option>Qoraqalpog‘iston</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white rounded-xl py-3 font-medium hover:bg-orange-600 transition"
                    >
                        Ro’yxatdan o’tish
                    </button>
                </form>

                {/* Kirish link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Siz avval ro’yxatdan o’tganmisiz?{" "}
                    <a
                        href="/login"
                        className="text-orange-500 hover:underline font-medium"
                    >
                        Kirish
                    </a>
                </p>
            </div>
        </main>
    );
}
