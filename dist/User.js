"use strict";
class DisplayingProducts {
    constructor() {
        this.divProduct = document.querySelector('.productsDiv');
        this.cart = this.loadCartFromLocalStorage();
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.divProduct.addEventListener('click', (event) => {
            this.handleButtonClick(event);
        });
    }
    handleButtonClick(event) {
        const target = event.target;
        if (target.classList.contains('add-to-cart-btn')) {
            const index = target.getAttribute('data-index');
            if (index !== null) {
                const selectedBook = this.getBookFromIndex(index);
                if (selectedBook) {
                    this.addToCart(selectedBook);
                    this.displayCart();
                }
            }
        }
    }
    getBookFromIndex(index) {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            const books = JSON.parse(storedBooks);
            return books[parseInt(index, 10)];
        }
        return undefined;
    }
    displayBooks(books) {
        this.divProduct.innerHTML = '';
        books.forEach((book, index) => {
            const productContainer = document.createElement('div');
            productContainer.className = 'profiless';
            productContainer.innerHTML = `
        <div class="card">
          <img src="${book.image}" alt="Book Image" class="imageSpace">
          <p>${book.names}</p>
          <p>Price: $${book.price}</p> <!-- Include the price information -->
          <div class="button-container">
            <button class="add-to-cart-btn" data-index="${index}" style= " border: none">Add to cart</button>
            <a href="#" class="view-details-link" data-index="${index}" style="background-color: #0a0a23; color: white;">View Details</a>
          </div>
        </div>
      `;
            this.divProduct.appendChild(productContainer);
            // Attach event listener for the "View Details" link
            const viewDetailsLink = productContainer.querySelector('.view-details-link');
            viewDetailsLink.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = `Product.html?index=${index}`;
            });
        });
    }
    addToCart(book) {
        const existingCartItem = this.cart.find((cartItem) => { var _a; return ((_a = cartItem.book) === null || _a === void 0 ? void 0 : _a.names) === book.names; });
        if (existingCartItem) {
            // If the item is already in the cart, increase its quantity
            existingCartItem.quantity += 1;
        }
        else {
            // If it's a new item, add it to the cart with quantity 1
            const newCartItem = { book, quantity: 1 };
            this.cart.push(newCartItem);
        }
        localStorage.setItem('cartItems', JSON.stringify(this.cart));
    }
    loadFromLocalStorageAndDisplay() {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            const books = JSON.parse(storedBooks);
            this.displayBooks(books);
        }
    }
    loadCartFromLocalStorage() {
        const storedCart = localStorage.getItem('cartItems');
        this.cart = storedCart ? JSON.parse(storedCart) : [];
        return this.cart;
    }
    displayCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        if (cartItems && cartTotal) {
            cartItems.innerHTML = '';
            let count = 0;
            this.cart.forEach((cartItem, index) => {
                count += cartItem.quantity;
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                const cartName = document.createElement('div');
                cartName.className = 'cart-name';
                cartName.textContent = cartItem.book.names;
                const cartImg = document.createElement('img');
                cartImg.className = 'cart-img';
                cartImg.setAttribute('src', cartItem.book.image);
                cartImg.className = 'user-images';
                const cartQuantity = document.createElement('div');
                cartQuantity.className = 'cart-quantity';
                cartQuantity.textContent = `Quantity: ${cartItem.quantity}`;
                const delItem = document.createElement('button');
                delItem.className = 'del-item';
                delItem.textContent = 'Delete';
                delItem.style.color = 'white';
                delItem.style.backgroundColor = 'black';
                delItem.style.fontSize = '18px';
                delItem.style.font = 'large';
                delItem.addEventListener('click', () => {
                    this.delCartItem(index);
                    count -= cartItem.quantity;
                    cartTotal.textContent = count.toString();
                });
                cartItemElement.appendChild(cartName);
                cartItemElement.appendChild(cartImg);
                cartItemElement.appendChild(cartQuantity);
                cartItemElement.appendChild(delItem);
                cartItems.appendChild(cartItemElement);
            });
            cartTotal.textContent = count.toString();
        }
    }
    delCartItem(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(this.cart));
        this.displayCart();
    }
}
const instances = new DisplayingProducts();
window.onload = () => {
    instances.loadFromLocalStorageAndDisplay();
    instances.loadCartFromLocalStorage(); // Load cart from local storage
    instances.displayCart();
};
