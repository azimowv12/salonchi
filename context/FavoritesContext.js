'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(new Set())

    // LocalStorage'dan sevimlilarni yuklash
    useEffect(() => {
        const savedFavorites = localStorage.getItem('salonchi-favorites')
        if (savedFavorites) {
            const favoritesArray = JSON.parse(savedFavorites)
            setFavorites(new Set(favoritesArray))
        }
    }, [])

    // Sevimlilarni localStorage'ga saqlash
    useEffect(() => {
        localStorage.setItem('salonchi-favorites', JSON.stringify([...favorites]))
    }, [favorites])

    const addToFavorites = (productId) => {
        setFavorites(prev => new Set([...prev, productId]))
    }

    const removeFromFavorites = (productId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev)
            newFavorites.delete(productId)
            return newFavorites
        })
    }

    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev)
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId)
            } else {
                newFavorites.add(productId)
            }
            return newFavorites
        })
    }

    const isFavorite = (productId) => {
        return favorites.has(productId)
    }

    const clearFavorites = () => {
        setFavorites(new Set())
    }

    const value = {
        favorites: [...favorites],
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        favoritesCount: favorites.size
    }

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}