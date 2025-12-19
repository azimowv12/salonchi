'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoHeart, IoMenu, IoClose, IoHome } from "react-icons/io5";
import { RiHistoryLine } from "react-icons/ri";
import { FiSearch, FiHome, FiUser } from "react-icons/fi";
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useDarkMode } from '@/context/DarkModeContext';
import Cart from '../context/Card';
import FavoritesModal from './FavoritesModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Navbar({ onCatalogToggle }) {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const catalogRef = useRef(null);
    const searchRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const router = useRouter();

    const { isDark } = useDarkMode();
    const { getCartItemsCount } = useCart();
    const { favoritesCount } = useFavorites();
    const cartItemsCount = getCartItemsCount();

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
                    productCount: Math.floor(Math.random() * 50) + 10,
                    distance: `${Math.floor(Math.random() * 10) + 1} km`
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (catalogRef.current && !catalogRef.current.contains(event.target)) {
                setIsCatalogOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchResults(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && event.target.id !== 'mobile-menu-button') {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

    const getDefaultCategories = () => [
        {
            id: 1,
            name: "Elektronika",
            icon: "/products/mashinka.png",
            productCount: 45,
            distance: "2 km"
        },
        {
            id: 2,
            name: "Go'zallik",
            icon: "/products/kasmetik.png",
            productCount: 32,
            distance: "5 km"
        },
        {
            id: 3,
            name: "Uy-ro'zg'or",
            icon: "/products/stoll.png",
            productCount: 28,
            distance: "3 km"
        }
    ];

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setShowSearchResults(false);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=10`);
            const data = response.data;
            setSearchResults(data.products || []);
            setShowSearchResults(true);
        } catch (error) {
            console.error('Qidiruvda xatolik:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleProductClick = (productId) => {
        setShowSearchResults(false);
        setSearchQuery('');
        setIsMobileSearchOpen(false);
        router.push(`/product/${productId}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    const handleCatalogToggle = () => {
        setIsCatalogOpen(!isCatalogOpen);
        if (onCatalogToggle) {
            onCatalogToggle(!isCatalogOpen);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(Math.round(price));
    };

    const getDiscountedPrice = (product) => {
        return product.discountPercentage
            ? Math.round(product.price * (1 - product.discountPercentage / 100))
            : product.price;
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isMobileSearchOpen) setIsMobileSearchOpen(false);
    };

    const toggleMobileSearch = () => {
        setIsMobileSearchOpen(!isMobileSearchOpen);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    return (
        <>
            <div className={`w-full ${isDark ? 'bg-gray-900' : 'bg-white'} sticky top-0 z-50 shadow-sm`}>
                <div className="max-w-7xl mx-auto pt-4 pb-4 px-4">
                    {/* Desktop Navigation */}
                    <div className='hidden md:flex gap-6 items-center'>
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
                                <div className={`absolute top-full left-0 mt-2 w-80 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-xl z-50 border animate-fadeIn`}>
                                    <div className="p-4">
                                        <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
                                            Barcha kategoriyalar
                                        </h3>
                                        {loading ? (
                                            <div className="flex justify-center py-8">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                                            </div>
                                        ) : (
                                            <ul className="space-y-1">
                                                {categories.map(category => (
                                                    <li key={category.id}>
                                                        <Link
                                                            href={`/category/${category.slug}`}
                                                            className={`flex justify-between items-center p-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-orange-50'} rounded-md cursor-pointer transition-colors duration-200 group`}
                                                            onClick={() => setIsCatalogOpen(false)}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    src={category.icon}
                                                                    alt={category.name}
                                                                    className="w-5 h-5 object-contain"
                                                                />
                                                                <div>
                                                                    <span className={`${isDark ? 'text-gray-200' : 'text-gray-700'} group-hover:text-orange-500 font-medium block`}>
                                                                        {category.name}
                                                                    </span>
                                                                    <div className="flex items-center gap-3 mt-1">
                                                                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                            {category.productCount} mahsulot
                                                                        </span>
                                                                        <span className="text-xs text-green-600 font-medium">
                                                                            {category.distance}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span className="text-gray-400 transform group-hover:translate-x-1 transition-transform">›</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <div className={`mt-4 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                                            <Link
                                                href="/categories"
                                                className="w-full text-center text-orange-500 hover:text-orange-600 font-medium py-2 transition-colors block"
                                                onClick={() => setIsCatalogOpen(false)}
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
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className={`w-full pl-12 pr-4 ${isDark ? 'bg-gray-800 text-gray-200 border-gray-700' : 'text-[#667085] border-[#E5E7EB]'} font-normal h-[48px] border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                    />
                                    <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                                        <CiSearch className={`text-[24px] ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
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
                            {showSearchResults && (
                                <div className={`absolute top-full left-0 right-0 mt-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-xl z-50 border max-h-96 overflow-y-auto animate-fadeIn`}>
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                                Natijalar ({searchResults.length})
                                            </h4>
                                            <button
                                                onClick={() => setShowSearchResults(false)}
                                                className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} text-sm`}
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {searchResults.length > 0 ? (
                                            <div className="space-y-2">
                                                {searchResults.map(product => (
                                                    <Link
                                                        key={product.id}
                                                        href={`/product/${product.id}`}
                                                        className={`flex items-center gap-3 p-3 ${isDark ? 'hover:bg-gray-700 border-gray-700 hover:border-orange-500' : 'hover:bg-orange-50 border-transparent hover:border-orange-200'} rounded-lg transition-colors cursor-pointer border`}
                                                    >
                                                        <div className="relative flex-shrink-0">
                                                            <img
                                                                src={product.thumbnail || '/placeholder-image.jpg'}
                                                                alt={product.title}
                                                                className={`w-16 h-16 object-cover rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = '/placeholder-image.jpg';
                                                                }}
                                                            />
                                                            {product.discountPercentage > 0 && (
                                                                <div className='absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold'>
                                                                    -{Math.round(product.discountPercentage)}%
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-1 line-clamp-1`}>
                                                                {product.title}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                <div className='flex items-center gap-1 text-amber-500 text-xs'>
                                                                    <span>⭐</span>
                                                                    <span>{product.rating}</span>
                                                                </div>
                                                                <span className='text-gray-300'>•</span>
                                                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                    {Math.floor(Math.random() * 100)} sharh
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                {product.discountPercentage > 0 ? (
                                                                    <>
                                                                        <span className='text-gray-400 text-sm line-through'>
                                                                            {formatPrice(product.price)} $
                                                                        </span>
                                                                        <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                                            {formatPrice(getDiscountedPrice(product))} $
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                                        {formatPrice(product.price)} $
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                <div className="text-4xl mb-2">🔍</div>
                                                <p className="font-medium">Hech narsa topilmadi</p>
                                                <p className="text-sm mt-1">{searchQuery} uchun natija yo'q</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Actions */}
                        <div className='flex gap-6 items-center'>
                            {/* Xaridlarim */}
                            <Link href='/xaridlarim' className='flex flex-col justify-center items-center group cursor-pointer'>
                                <div className='relative'>
                                    <RiHistoryLine className={`text-[24px] ${isDark ? 'text-gray-300' : 'text-gray-600'} group-hover:text-orange-500 transition-colors`} />
                                </div>
                                <h1 className={`text-[12px] font-normal ${isDark ? 'text-gray-300' : 'text-gray-600'} group-hover:text-orange-500 transition-colors whitespace-nowrap`}>
                                    Xaridlarim
                                </h1>
                            </Link>

                            {/* Profil */}
                            <Link href='/profile' className='flex flex-col justify-center items-center group cursor-pointer'>
                                <div className='relative'>
                                    <FaRegUser className={`text-[24px] ${isDark ? 'text-gray-300' : 'text-gray-600'} group-hover:text-orange-500 transition-colors`} />
                                </div>
                                <h1 className={`text-[12px] font-normal ${isDark ? 'text-gray-300' : 'text-gray-600'} group-hover:text-orange-500 transition-colors`}>Profil</h1>
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
                                        <IoHeart className={`text-[24px] ${isDark ? 'text-gray-300' : 'text-gray-600'} group-hover:text-red-500 transition-colors`} />
                                    )}
                                    {favoritesCount > 0 && (
                                        <span className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse'>
                                            {favoritesCount > 9 ? '9+' : favoritesCount}
                                        </span>
                                    )}
                                </div>
                                <h1 className={`text-[12px] font-normal ${isDark ? 'text-gray-300' : 'text-gray-600'} group-hover:text-red-500 transition-colors`}>Sevimlilar</h1>
                            </div>

                            {/* Savat */}
                            <div
                                className='flex flex-col justify-center items-center group cursor-pointer relative'
                                onClick={() => setIsCartOpen(true)}
                            >
                                <div className='relative'>
                                    <IoCartOutline className={`text-[24px] ${isDark ? 'text-gray-300' : 'text-gray-600'} group-hover:text-orange-500 transition-colors`} />
                                    {cartItemsCount > 0 && (
                                        <span className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse'>
                                            {cartItemsCount > 9 ? '9+' : cartItemsCount}
                                        </span>
                                    )}
                                </div>
                                <h1 className={`text-[12px] font-normal ${isDark ? 'text-gray-300' : 'text-gray-600'} group-hover:text-orange-500 transition-colors`}>Savat</h1>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className='md:hidden'>
                        {/* Mobile Top Bar */}
                        <div className='flex justify-between items-center'>
                            {/* Left: Logo and Menu */}
                            <div className='flex items-center gap-3'>
                                <button
                                    id="mobile-menu-button"
                                    onClick={toggleMobileMenu}
                                    className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    {isMobileMenuOpen ? (
                                        <IoClose className='text-2xl' />
                                    ) : (
                                        <IoMenu className='text-2xl' />
                                    )}
                                </button>

                                <Link href={'/'} className='flex items-center gap-2'>
                                    <img src="/logo.png" alt="Salonchi logo" className='w-7 h-7' />
                                    <h1 className='text-[#EA580C] text-xl font-semibold'>Salonchi</h1>
                                </Link>
                            </div>

                            {/* Right: Search and Cart */}
                            <div className='flex items-center gap-3'>
                                <button
                                    onClick={toggleMobileSearch}
                                    className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    <FiSearch className='text-xl' />
                                </button>

                                <div className='relative'>
                                    <button
                                        onClick={() => setIsCartOpen(true)}
                                        className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} relative`}
                                    >
                                        <IoCartOutline className='text-xl' />
                                        {cartItemsCount > 0 && (
                                            <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold'>
                                                {cartItemsCount > 9 ? '9+' : cartItemsCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Search Bar */}
                        {isMobileSearchOpen && (
                            <div className='mt-4 animate-slideDown'>
                                <form onSubmit={handleSearch} className='relative'>
                                    <input
                                        type="search"
                                        placeholder='Mahsulot izlash...'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className={`w-full pl-12 pr-4 py-3 ${isDark ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-gray-100 text-gray-700 border-gray-300'} rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500`}
                                        autoFocus
                                    />
                                    <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                                        <FiSearch className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </div>
                                    <button
                                        type='submit'
                                        className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#EA580C] text-white p-2 rounded-md'
                                    >
                                        {loading ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        ) : (
                                            'Izlash'
                                        )}
                                    </button>
                                </form>

                                {/* Mobile Search Results */}
                                {showSearchResults && (
                                    <div className={`absolute left-0 right-0 mt-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-xl z-50 border max-h-80 overflow-y-auto animate-fadeIn`}>
                                        <div className="p-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className={`font-semibold text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                                    Natijalar ({searchResults.length})
                                                </h4>
                                                <button
                                                    onClick={() => setShowSearchResults(false)}
                                                    className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} text-sm p-1`}
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            {searchResults.length > 0 ? (
                                                <div className="space-y-2">
                                                    {searchResults.map(product => (
                                                        <div
                                                            key={product.id}
                                                            onClick={() => handleProductClick(product.id)}
                                                            className={`flex items-center gap-3 p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-orange-50'} rounded-lg transition-colors cursor-pointer`}
                                                        >
                                                            <div className="relative flex-shrink-0">
                                                                <img
                                                                    src={product.thumbnail || '/placeholder-image.jpg'}
                                                                    alt={product.title}
                                                                    className={`w-12 h-12 object-cover rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                                                                />
                                                                {product.discountPercentage > 0 && (
                                                                    <div className='absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-semibold'>
                                                                        -{Math.round(product.discountPercentage)}%
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-1 truncate`}>
                                                                    {product.title}
                                                                </p>
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-1">
                                                                        <span className='text-amber-500 text-xs'>⭐ {product.rating}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        {product.discountPercentage > 0 ? (
                                                                            <>
                                                                                <span className='text-gray-400 text-xs line-through'>
                                                                                    {formatPrice(product.price)} $
                                                                                </span>
                                                                                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                                                    {formatPrice(getDiscountedPrice(product))} $
                                                                                </span>
                                                                            </>
                                                                        ) : (
                                                                            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                                                {formatPrice(product.price)} $
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className={`text-center py-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    <p className="font-medium text-sm">Hech narsa topilmadi</p>
                                                    <p className="text-xs mt-1">{searchQuery} uchun natija yo'q</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile Menu */}
                        {isMobileMenuOpen && (
                            <div
                                ref={mobileMenuRef}
                                className={`absolute top-full left-0 right-0 mt-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-xl z-50 border animate-slideDown`}
                            >
                                <div className="p-4">
                                    {/* User Info */}
                                    <div className={`flex items-center gap-3 p-3 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg mb-4`}>
                                        <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center`}>
                                            <FiUser className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                                        </div>
                                        <div>
                                            <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Xush kelibsiz</p>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Akkauntga kirish</p>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="space-y-1">
                                        <Link
                                            href="/"
                                            className={`flex items-center gap-3 p-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <IoHome className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                                            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Bosh sahifa</span>
                                        </Link>

                                        <div
                                            onClick={handleCatalogToggle}
                                            className={`flex items-center gap-3 p-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors cursor-pointer`}
                                        >
                                            <FaBars className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                                            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Kategoriyalar</span>
                                        </div>

                                        <Link
                                            href="/xaridlarim"
                                            className={`flex items-center gap-3 p-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <RiHistoryLine className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                                            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Xaridlarim</span>
                                        </Link>

                                        <Link
                                            href="/profile"
                                            className={`flex items-center gap-3 p-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <FaRegUser className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                                            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Profil</span>
                                        </Link>

                                        <div
                                            onClick={() => {
                                                setIsFavoritesOpen(true);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`flex items-center justify-between p-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors cursor-pointer`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <IoHeart className={`text-xl ${favoritesCount > 0 ? 'text-red-500' : isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                                                <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Sevimlilar</span>
                                            </div>
                                            {favoritesCount > 0 && (
                                                <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
                                                    {favoritesCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Categories Section */}
                                    <div className="mt-6">
                                        <h3 className={`font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Tezkor kategoriyalar</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {categories.slice(0, 4).map(category => (
                                                <Link
                                                    key={category.id}
                                                    href={`/category/${category.slug}`}
                                                    className={`flex items-center gap-2 p-3 ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    <img
                                                        src={category.icon}
                                                        alt={category.name}
                                                        className="w-5 h-5 object-contain"
                                                    />
                                                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} truncate`}>
                                                        {category.name}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mobile Bottom Navigation */}
                        {!isMobileSearchOpen && !isMobileMenuOpen && (
                            <div className={`fixed bottom-0 left-0 right-0 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t z-40 md:hidden`}>
                                <div className="flex justify-around items-center py-2">
                                    <Link
                                        href="/"
                                        className="flex flex-col items-center p-2"
                                    >
                                        <IoHome className={`text-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                                        <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Bosh</span>
                                    </Link>

                                    <button
                                        onClick={handleCatalogToggle}
                                        className="flex flex-col items-center p-2"
                                    >
                                        <FaBars className={`text-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                                        <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Katalog</span>
                                    </button>

                                    <button
                                        onClick={toggleMobileSearch}
                                        className="flex flex-col items-center p-2"
                                    >
                                        <FiSearch className={`text-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                                        <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Qidiruv</span>
                                    </button>

                                    <button
                                        onClick={() => setIsFavoritesOpen(true)}
                                        className="flex flex-col items-center p-2 relative"
                                    >
                                        <IoHeart className={`text-2xl ${favoritesCount > 0 ? 'text-red-500' : isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                                        <span className={`text-xs mt-1 ${favoritesCount > 0 ? 'text-red-500' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sevimli</span>
                                        {favoritesCount > 0 && (
                                            <span className='absolute top-0 right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center'>
                                                {favoritesCount}
                                            </span>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => setIsCartOpen(true)}
                                        className="flex flex-col items-center p-2 relative"
                                    >
                                        <IoCartOutline className={`text-2xl ${cartItemsCount > 0 ? 'text-orange-500' : isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                                        <span className={`text-xs mt-1 ${cartItemsCount > 0 ? 'text-orange-500' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>Savat</span>
                                        {cartItemsCount > 0 && (
                                            <span className='absolute top-0 right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center'>
                                                {cartItemsCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cart Modal */}
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* Favorites Modal */}
            <FavoritesModal isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />

            {/* Add custom CSS for animations */}
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </>
    );
}