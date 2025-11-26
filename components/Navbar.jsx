'use client';
import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoHeart } from "react-icons/io5";
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import Cart from '../context/Card';
import FavoritesModal from './FavoritesModal';
import axios from 'axios';

export default function Navbar({ onCatalogToggle }) {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const catalogRef = useRef(null);
    const searchRef = useRef(null);
    
    const { getCartItemsCount } = useCart();
    const { favoritesCount } = useFavorites();
    const cartItemsCount = getCartItemsCount();

    // Kategoriyalarni DummyJSON API dan olish
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://dummyjson.com/products/categories');
                const data = response.data;

                const formattedCategories = data.map((category, index) => ({
                    id: index + 1,
                    name: category.name || category,
                    slug: category.slug || category,
                    icon: getCategoryIcon(category),
                    subcategories: generateSubcategories(category)
                }));
                
                setCategories(formattedCategories);
            } catch (error) {
                console.error('Kategoriyalarni yuklashda xatolik:', error);
                setCategories(getDefaultCategories());
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Tashqi click larni handle qilish
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (catalogRef.current && !catalogRef.current.contains(event.target)) {
                setIsCatalogOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
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

    // Subkategoriyalarni generatsiya qilish
    const generateSubcategories = (category) => {
        const subcategoryMap = {
            'smartphones': ['Barcha telefonlar', 'Flagship modellar', 'Budget telefonlar', 'Gaming telefonlar'],
            'laptops': ['Barcha noutbuklar', 'Gaming noutbuklar', 'Ultrabooklar', 'Workstation'],
            'skincare': ['Yuz parvarishi', 'Tana parvarishi', 'Quyoshdan himoya', 'Namlovchi kremlar'],
            'fragrances': ['Erkaklar atirlari', 'Ayollar atirlari', 'Uniseks atirlar', 'Premium atirlar'],
            'groceries': ['Organik mahsulotlar', 'Sut mahsulotlari', 'Quruq mevalar', 'Konservalar'],
            'home-decoration': ['Interyer dekorlari', 'Shamlar', 'Rasmlar', 'Guldonlar'],
            'furniture': ['Barcha mebellar', 'Yotoq xonalari', 'Ofis mebellari', 'Oshxona mebellari']
        };
        
        const categoryName = typeof category === 'string' ? category : category.slug;
        return subcategoryMap[categoryName] || ['Barcha mahsulotlar', 'Yangi kelganlar', 'Chegirmali mahsulotlar', 'Premium mahsulotlar'];
    };

    // Standart kategoriyalar
    const getDefaultCategories = () => [
        {
            id: 1,
            name: "Elektronika",
            icon: "/products/mashinka.png",
            subcategories: ["Smartfonlar", "Noutbuklar", "Planshetlar", "Aqlli soatlar"]
        },
        {
            id: 2,
            name: "Go'zallik",
            icon: "/products/kasmetik.png",
            subcategories: ["Parfyumeriya", "Teriya parvarishi", "Makiyaj", "Soch parvarishi"]
        },
        {
            id: 3,
            name: "Uy-ro'zg'or",
            icon: "/products/stoll.png",
            subcategories: ["Mebellar", "Uy bezaklari", "Oshxona buyumlari", "Yoritgichlar"]
        }
    ];

    // Qidiruvni bajarish
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            setLoading(true);
            const response = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`);
            const data = response.data;
            setSearchResults(data.products || []);
            setShowSearchResults(true);
            
            // Qidiruv natijalarini console ga chiqaramiz
            console.log('Qidiruv natijalari:', data.products);
        } catch (error) {
            console.error('Qidiruvda xatolik:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    // Real-time qidiruv (optional)
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        
        // Agar real-time qidiruv kerak bo'lsa
        if (value.length > 2) {
            // Bu yerda debounce qo'shishingiz mumkin
        } else {
            setShowSearchResults(false);
        }
    };

    const handleCatalogToggle = () => {
        setIsCatalogOpen(!isCatalogOpen);
        if (onCatalogToggle) {
            onCatalogToggle(!isCatalogOpen);
        }
    };

    // Mahsulot narxini formatlash
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <>
            <div className='max-w-7xl mx-auto mt-8 px-4'>
                {/* Desktop View */}
                <div className='hidden md:flex gap-10 items-center'>
                    {/* Logo */}
                    <Link href={'/'} className='flex items-center gap-2 flex-shrink-0'>
                        <img src="/logo.png" alt="Salonchi logo" className='w-8 h-8' />
                        <h1 className='text-[#EA580C] text-[24px] font-semibold leading-[100%] font-Rubik'>Salonchi</h1>
                    </Link>

                    {/* Kategoriya */}
                    <div className="relative" ref={catalogRef}>
                        <div
                            className="cursor-pointer flex gap-[10px] items-center bg-[#EA580C] rounded-[8px] w-[154px] h-[48px] pl-4 text-white transition-all duration-300 hover:bg-orange-600"
                            onClick={handleCatalogToggle}
                        >
                            {isCatalogOpen ? (
                                <FaTimes className='text-[20px] cursor-pointer' />
                            ) : (
                                <FaBars className='text-[20px] cursor-pointer' />
                            )}
                            <button className='font-medium text-[16px] cursor-pointer leading-[100%]'>
                                {loading ? 'Yuklanmoqda...' : 'Kategoriya'}
                            </button>
                        </div>

                        {isCatalogOpen && (
                            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200 animate-fadeIn">
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Barcha kategoriyalar</h3>
                                    {loading ? (
                                        <div className="flex justify-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                                        </div>
                                    ) : (
                                        <ul className="space-y-1">
                                            {categories.map(category => (
                                                <li key={category.id} className="group relative">
                                                    <div className="flex justify-between items-center p-3 hover:bg-orange-50 rounded-md cursor-pointer transition-colors duration-200">
                                                        <div className="flex items-center gap-3">
                                                            <img src={category.icon} alt={category.name} className="w-5 h-5" />
                                                            <span className="text-gray-700 group-hover:text-orange-500 font-medium">
                                                                {category.name}
                                                            </span>
                                                        </div>
                                                        <span className="text-gray-400 transform group-hover:translate-x-1 transition-transform">›</span>
                                                    </div>
                                                    <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                                                        <div className="p-3">
                                                            <h4 className="font-semibold text-gray-800 mb-2 text-sm">{category.name} turlari</h4>
                                                            <ul className="space-y-1">
                                                                {category.subcategories.map((sub, index) => (
                                                                    <li key={index} className="p-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded cursor-pointer transition-colors">
                                                                        {sub}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="mt-4 pt-3 border-t border-gray-200">
                                        <Link 
                                            href="/categories" 
                                            className="w-full text-center text-orange-500 hover:text-orange-600 font-medium py-2 transition-colors block"
                                        >
                                            Barchasini ko'rish
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search */}
                    <div className="flex flex-1 max-w-2xl relative" ref={searchRef}>
                        <form onSubmit={handleSearch} className="flex flex-1">
                            <div className='relative flex-1'>
                                <input 
                                    type="search" 
                                    placeholder='Mahsulot izlash...' 
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className='w-full pl-12 pr-4 text-[#667085] font-normal h-[48px] border border-[#E5E7EB] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent' 
                                />
                                <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                                    <CiSearch className='text-[24px] text-gray-400' />
                                </div>
                            </div>
                            <button 
                                type='submit'
                                disabled={loading}
                                className='bg-[#EA580C] cursor-pointer w-[112px] h-[48px] rounded-r-lg font-medium text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                                ) : (
                                    'Izlash'
                                )}
                            </button>
                        </form>

                        {/* Qidiruv natijalari */}
                        {showSearchResults && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 border border-gray-200 max-h-96 overflow-y-auto">
                                <div className="p-4">
                                    <h4 className="font-semibold text-gray-800 mb-3">Qidiruv natijalari ({searchResults.length})</h4>
                                    <div className="space-y-2">
                                        {searchResults.map(product => (
                                            <Link 
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="flex items-center gap-3 p-2 hover:bg-orange-50 rounded-lg transition-colors"
                                                onClick={() => setShowSearchResults(false)}
                                            >
                                                <img 
                                                    src={product.thumbnail} 
                                                    alt={product.title}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-800">{product.title}</p>
                                                    <p className="text-xs text-orange-500 font-semibold">
                                                        {formatPrice(product.price)}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {showSearchResults && searchResults.length === 0 && searchQuery && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                                <div className="p-4 text-center text-gray-500">
                                    Hech narsa topilmadi
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Actions */}
                    <div className='flex gap-8 items-center'>
                        {/* Profil */}
                        <Link href='/login' className='flex flex-col justify-center items-center group cursor-pointer'>
                            <div className='relative'>
                                <FaRegUser className='text-[24px] text-gray-600 group-hover:text-orange-500 transition-colors' />
                            </div>
                            <h1 className='text-[14px] font-normal text-gray-600 group-hover:text-orange-500 transition-colors'>Profil</h1>
                        </Link>

                        {/* Sevimlilar */}
                        <div 
                            className='flex flex-col justify-center items-center group cursor-pointer relative'
                            onClick={() => setIsFavoritesOpen(true)}
                        >
                            <div className='relative'>
                                {favoritesCount > 0 ? (
                                    <IoHeart className='text-[24px] text-red-500 group-hover:text-red-600 transition-colors' />
                                ) : (
                                    <IoHeart className='text-[24px] text-gray-600 group-hover:text-red-500 transition-colors' />
                                )}
                                {favoritesCount > 0 && (
                                    <span className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse'>
                                        {favoritesCount > 9 ? '9+' : favoritesCount}
                                    </span>
                                )}
                            </div>
                            <h1 className='text-[14px] font-normal text-gray-600 group-hover:text-red-500 transition-colors'>Sevimlilar</h1>
                        </div>

                        {/* Savat */}
                        <div 
                            className='flex flex-col justify-center items-center group cursor-pointer relative'
                            onClick={() => setIsCartOpen(true)}
                        >
                            <div className='relative'>
                                <IoCartOutline className='text-[24px] text-gray-600 group-hover:text-orange-500 transition-colors' />
                                {cartItemsCount > 0 && (
                                    <span className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse'>
                                        {cartItemsCount > 9 ? '9+' : cartItemsCount}
                                    </span>
                                )}
                            </div>
                            <h1 className='text-[14px] font-normal text-gray-600 group-hover:text-orange-500 transition-colors'>Savat</h1>
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className='flex flex-col gap-3 md:hidden'>
                    <div className='flex justify-between items-center'>
                        <Link href={'/'} className='flex items-center gap-2'>
                            <img src="/logo.png" alt="logo" className='w-8 h-8' />
                            <h1 className='text-[#EA580C] text-[18px] font-semibold font-Rubik'>Salonchi</h1>
                        </Link>
                        <div className='flex items-center gap-4'>
                            {/* Savat */}
                            <div 
                                className='relative cursor-pointer'
                                onClick={() => setIsCartOpen(true)}
                            >
                                <IoCartOutline className='text-[20px] text-gray-600' />
                                {cartItemsCount > 0 && (
                                    <span className='absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold'>
                                        {cartItemsCount > 9 ? '9+' : cartItemsCount}
                                    </span>
                                )}
                            </div>
                            
                            {/* Sevimlilar */}
                            <div 
                                className='relative cursor-pointer'
                                onClick={() => setIsFavoritesOpen(true)}
                            >
                                {favoritesCount > 0 ? (
                                    <IoHeart className='text-[20px] text-red-500' />
                                ) : (
                                    <IoHeart className='text-[20px] text-gray-600' />
                                )}
                                {favoritesCount > 0 && (
                                    <span className='absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold'>
                                        {favoritesCount > 9 ? '9+' : favoritesCount}
                                    </span>
                                )}
                            </div>

                            {/* Kategoriya */}
                            <div 
                                className="cursor-pointer"
                                onClick={handleCatalogToggle}
                            >
                                {isCatalogOpen ? (
                                    <FaTimes className='text-[18px] text-gray-600' />
                                ) : (
                                    <FaBars className='text-[18px] text-gray-600' />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className='relative mt-2' ref={searchRef}>
                        <form onSubmit={handleSearch} className='relative'>
                            <input
                                type="search"
                                placeholder='Mahsulot izlash...'
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className='w-full h-[40px] pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-[#667085] text-[14px] focus:outline-none focus:ring-1 focus:ring-orange-500'
                            />
                            <div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
                                <CiSearch className='text-[20px] text-gray-400' />
                            </div>
                            <button 
                                type='submit'
                                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-3 py-1 rounded text-sm'
                            >
                                {loading ? '...' : 'Izlash'}
                            </button>
                        </form>

                        {/* Mobile Search Results */}
                        {showSearchResults && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 border border-gray-200 max-h-64 overflow-y-auto">
                                <div className="p-3">
                                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Natijalar ({searchResults.length})</h4>
                                    <div className="space-y-2">
                                        {searchResults.slice(0, 5).map(product => (
                                            <Link 
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="flex items-center gap-2 p-2 hover:bg-orange-50 rounded transition-colors"
                                                onClick={() => setShowSearchResults(false)}
                                            >
                                                <img 
                                                    src={product.thumbnail} 
                                                    alt={product.title}
                                                    className="w-8 h-8 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-xs font-medium text-gray-800 truncate">{product.title}</p>
                                                    <p className="text-xs text-orange-500 font-semibold">
                                                        {formatPrice(product.price)}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Catalog Menu */}
                    {isCatalogOpen && (
                        <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 animate-fadeIn">
                            <div className="p-3">
                                <h3 className="text-base font-semibold text-gray-800 mb-2 border-b pb-2">Kategoriyalar</h3>
                                {loading ? (
                                    <div className="flex justify-center py-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                                    </div>
                                ) : (
                                    <ul className="space-y-1">
                                        {categories.map(category => (
                                            <li key={category.id} className="p-2 hover:bg-orange-50 rounded cursor-pointer transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <img src={category.icon} alt={category.name} className="w-4 h-4" />
                                                    <span className="text-gray-700 font-medium text-sm">
                                                        {category.name}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Cart Modal */}
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            
            {/* Favorites Modal */}
            <FavoritesModal isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
        </>
    )
}