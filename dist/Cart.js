"use strict";
let cart = [];
let cartTotals = 0;
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    // Clear the existing cart display
    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            const product = item.product;
            const quantity = item.quantity;
            cartItem.classList.add('cart-item'); // Add the cart-item class
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div>
                    <h3>${product.title}</h3>
                    <p>Description: ${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Quantity: ${quantity}</p>
                </div>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            if (cartItems) {
                cartItems.appendChild(cartItem);
            }
        });
    }
    // Cart total
    if (cartTotalDisplay) {
        cartTotalDisplay.textContent = `$${cartTotals.toFixed(2)}`;
    }
    // Attach click event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            const target = event.target;
            const index = target.getAttribute('data-index');
            deleteCartItem(index);
        });
    });
}
// Function to delete a cart item by index
function deleteCartItem(index) {
    if (index !== null) {
        const item = cart[parseInt(index, 10)];
        if (item) {
            const itemTotal = item.product.price * item.quantity;
            cartTotals -= itemTotal;
            cart.splice(parseInt(index, 10), 1);
            updateCartDisplay();
        }
    }
}
// Example usage
const sampleProduct = {
    title: 'Sample Product',
    description: 'A sample product description.',
    price: 20.99,
    image: 'sample-image.jpg',
};
const sampleCartItem = {
    product: sampleProduct,
    quantity: 2,
};
cart.push(sampleCartItem);
cartTotals += sampleProduct.price * sampleCartItem.quantity;
// Initial update of the cart display
updateCartDisplay();
