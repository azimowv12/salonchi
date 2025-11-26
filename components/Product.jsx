'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductCatalog() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAll, setShowAll] = useState(false);

    // Kategoriyalarni DummyJSON API dan olish
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://dummyjson.com/products/categories');
                const data = await response.json();
                
                // Ma'lumotlarni kerakli formatga o'tkazamiz
                const formattedCategories = data.map((category, index) => ({
                    id: index + 1,
                    name: category.name || category,
                    slug: category.slug || category,
                    icon: getCategoryIcon(category),
                    productCount: Math.floor(Math.random() * 50) + 10 // Tasodifiy mahsulot soni
                }));
                
                setCategories(formattedCategories);
            } catch (error) {
                console.error('Kategoriyalarni yuklashda xatolik:', error);
                // Agar API ishlamasa, standart kategoriyalarni ko'rsatamiz
                setCategories(getDefaultCategories());
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Kategoriya iconlarini belgilash
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
        };
        
        const categoryName = typeof category === 'string' ? category.toLowerCase() : category.slug;
        return categoryIcons[categoryName] || '/products/stoll.png';
    };

    // Standart kategoriyalar
    const getDefaultCategories = () => [
        {
            id: 1,
            name: "Kreslo",
            icon: "/products/stoll.png",
            productCount: 24,
            slug: "chairs"
        },
        {
            id: 2,
            name: "Kosmetologiya asboblari",
            icon: "/products/kasmetik.png",
            productCount: 18,
            slug: "cosmetology-tools"
        },
        {
            id: 3,
            name: "Mashinka",
            icon: "/products/mashinka.png",
            productCount: 32,
            slug: "machines"
        },
        {
            id: 4,
            name: "Elektr ustara",
            icon: "/products/Elektr ustara.png",
            productCount: 15,
            slug: "electric-shaver"
        },
        {
            id: 5,
            name: "Trimmer",
            icon: "/products/trimmer.png",
            productCount: 21,
            slug: "trimmer"
        },
        {
            id: 6,
            name: "Fen",
            icon: "/products/fen.png",
            productCount: 28,
            slug: "hairdryer"
        },
        {
            id: 7,
            name: "Epilyator",
            icon: "/products/epilyator.png",
            productCount: 12,
            slug: "epilator"
        }
    ];

    // Kategoriyani tanlash
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        // Bu yerda kategoriya bo'yicha mahsulotlarni yuklash logikasini qo'shishingiz mumkin
        console.log('Tanlangan kategoriya:', category);
    };

    // Barchasini ko'rish
    const displayedCategories = showAll ? categories : categories.slice(0, 7);

    if (loading) {
        return (
            <div className='max-w-7xl mx-auto flex gap-6 mt-8 hidden md:flex justify-center'>
                <div className="animate-pulse flex gap-6">
                    {[...Array(7)].map((_, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <div className="w-6 h-6 bg-gray-300 rounded"></div>
                            <div className="w-24 h-4 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto mt-8 px-4">
            {/* Desktop View */}
            <div className='hidden md:flex flex-col'>
                {/* Katalog sarlavhasi */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Mahsulot Katalogi</h2>
                    <div className="flex items-center gap-4">
                        {selectedCategory && (
                            <div className="flex items-center gap-2 text-orange-500">
                                <span>Tanlangan:</span>
                                <span className="font-semibold">{selectedCategory.name}</span>
                                <button 
                                    onClick={() => setSelectedCategory(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Kategoriyalar */}
                <div className='flex flex-wrap gap-6 items-center justify-between'>
                    <div className='flex flex-wrap gap-6'>
                        {displayedCategories.map((category) => (
                            <div
                                key={category.id}
                                className={`flex gap-2 items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                                    selectedCategory?.id === category.id
                                        ? 'bg-orange-100 border-2 border-orange-500'
                                        : 'bg-gray-50 hover:bg-orange-50 border-2 border-transparent'
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

                    {/* Barchasini ko'rish dropdown */}
                    <div className="relative">
                        <select 
                            value={showAll ? 'all' : 'some'}
                            onChange={(e) => setShowAll(e.target.value === 'all')}
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

                {/* Tanlangan kategoriya bo'yicha mahsulotlar (agar tanlangan bo'lsa) */}
                {selectedCategory && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {selectedCategory.name} - Mahsulotlar
                            </h3>
                            <Link 
                                href={`/categories/${selectedCategory.slug}`}
                                className="text-orange-500 hover:text-orange-600 font-medium"
                            >
                                Barchasini ko'rish →
                            </Link>
                        </div>
                        
                        {/* Bu yerda tanlangan kategoriya bo'yicha mahsulotlarni ko'rsatishingiz mumkin */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="text-center py-8 text-gray-500">
                                Mahsulotlar yuklanmoqda...
                                {/* Bu yerda mahsulotlarni map qilishingiz mumkin */}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile View */}
            <div className='md:hidden'>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Katalog</h2>
                </div>

                {/* Mobile kategoriyalar */}
                <div className="grid grid-cols-2 gap-3">
                    {categories.slice(0, 6).map((category) => (
                        <div
                            key={category.id}
                            className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                                selectedCategory?.id === category.id
                                    ? 'bg-orange-100 border-2 border-orange-500'
                                    : 'bg-gray-50 hover:bg-orange-50 border-2 border-transparent'
                            }`}
                            onClick={() => handleCategorySelect(category)}
                        >
                            <img 
                                src={category.icon} 
                                alt={category.name} 
                                className='w-8 h-8 object-contain mb-2'
                            />
                            <h3 className='text-sm font-medium text-gray-800 text-center leading-tight'>
                                {category.name}
                            </h3>
                            <span className="text-xs text-gray-500 mt-1">
                                {category.productCount}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Ko'proq ko'rish tugmasi */}
                {categories.length > 6 && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-orange-500 hover:text-orange-600 font-medium"
                        >
                            {showAll ? 'Kamroq ko\'rish' : `+${categories.length - 6} ta ko'proq`}
                        </button>
                    </div>
                )}

                {/* Mobile uchun to'liq ro'yxat */}
                {showAll && (
                    <div className="mt-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Barcha kategoriyalar</h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`flex items-center gap-3 p-3 rounded cursor-pointer ${
                                        selectedCategory?.id === category.id
                                            ? 'bg-orange-100 text-orange-600'
                                            : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => {
                                        handleCategorySelect(category);
                                        setShowAll(false);
                                    }}
                                >
                                    <img 
                                        src={category.icon} 
                                        alt={category.name} 
                                        className='w-5 h-5 object-contain'
                                    />
                                    <span className="font-medium">{category.name}</span>
                                    <span className="text-xs text-gray-500 ml-auto">
                                        ({category.productCount})
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Kategoriya tanlash modal (mobile uchun) */}
            {selectedCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:hidden">
                    <div className="bg-white rounded-lg p-6 mx-4 w-full max-w-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <img 
                                src={selectedCategory.icon} 
                                alt={selectedCategory.name} 
                                className='w-8 h-8 object-contain'
                            />
                            <h3 className="text-lg font-semibold">{selectedCategory.name}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Ushbu kategoriyada {selectedCategory.productCount} ta mahsulot mavjud.
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href={`/categories/${selectedCategory.slug}`}
                                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded text-center font-medium hover:bg-orange-600 transition-colors"
                            >
                                Ko'rish
                            </Link>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded font-medium hover:bg-gray-400 transition-colors"
                            >
                                Orqaga
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}