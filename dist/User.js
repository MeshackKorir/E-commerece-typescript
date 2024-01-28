"use strict";
const adminLink = document.querySelector('.navs a');

const bannerContent = document.querySelector('.banner-content');
const cartSection = document.getElementById('cart-section');

const productModal = document.getElementById('product-modal');
const productTitle = productModal.querySelector('#product-title');
const productDescription = productModal.querySelector('#product-description');
const productPrice = productModal.querySelector('#product-price');
const productImage = productModal.querySelector('#product-image');
const decrementQuantityBtn = productModal.querySelector('#decrement-quantity');
const productQuantityInput = productModal.querySelector('#product-quantity');
const incrementQuantityBtn = productModal.querySelector('#increment-quantity');
const addToCartBtn = productModal.querySelector('#add-to-cart');

const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart-button');

adminLink.addEventListener('click', () => {
    window.location.href = './Admin.html';
});

