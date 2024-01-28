"use strict";
// Navigation links
const adminLink = document.querySelector('.navs a');
// Header elements
const bannerContent = document.querySelector('.banner-content');
const cartSection = document.getElementById('cart-section');
// Product modal elements
const productModal = document.getElementById('product-modal');
const productTitle = productModal.querySelector('#product-title');
const productDescription = productModal.querySelector('#product-description');
const productPrice = productModal.querySelector('#product-price');
const productImage = productModal.querySelector('#product-image');
const decrementQuantityBtn = productModal.querySelector('#decrement-quantity');
const productQuantityInput = productModal.querySelector('#product-quantity');
const incrementQuantityBtn = productModal.querySelector('#increment-quantity');
const addToCartBtn = productModal.querySelector('#add-to-cart');
// Cart section elements
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart-button');
// Event listeners
adminLink.addEventListener('click', () => {
    // Redirect to the admin page
    window.location.href = './Admin.html';
});
// Add any additional event listeners or logic as needed.
// ... (Continue integrating TypeScript with your existing JavaScript logic)
