// src/lib/cart.js
// Cart is stored in localStorage as an array of items:
// { sku, name, leather, price, quantity, image }

const CART_KEY = 'cc_cart';

export function getCart() {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
        return [];
    }
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Dispatch event so nav cart count can update
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

export function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(i => i.sku === item.sku);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    saveCart(cart);
}

export function removeFromCart(sku) {
    const cart = getCart().filter(i => i.sku !== sku);
    saveCart(cart);
}

export function updateQuantity(sku, quantity) {
    const cart = getCart();
    const item = cart.find(i => i.sku === sku);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(cart);
    }
}

export function clearCart() {
    saveCart([]);
}

export function getCartCount() {
    return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

export function getCartTotal() {
    return getCart().reduce((sum, i) => sum + (i.price * i.quantity), 0);
}