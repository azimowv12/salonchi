import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (product) => set((state) => {
    const existing = state.cartItems.find(item => item.id === product.id);
    if (existing) {
      return {
        cartItems: state.cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ),
      };
    }
    return {
      cartItems: [...state.cartItems, { ...product, quantity: 1 }],
    };
  }),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.id !== productId),
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cartItems: state.cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ),
  })),
  clearCart: () => set({ cartItems: [] }),
  purchaseCart: () => set((state) => {
    const purchased = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
    localStorage.setItem('purchasedItems', JSON.stringify([
      ...purchased,
      ...state.cartItems
    ]));
    return { cartItems: [] };
  }),
}));
