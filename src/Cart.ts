interface Product {
    title: string;
    description: string;
    price: number;
    image: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

let cart: CartItem[] = [];
let cartTotals: number = 0;

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');

    if (!cartItems || !cartTotalDisplay) {
        console.error('Required HTML elements not found.');
        return;
    }

    // Clear the existing cart display
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = createCartItemElement(item, index);
        cartItems.appendChild(cartItem);
    });

    // Cart total
    cartTotalDisplay.textContent = `$${cartTotals.toFixed(2)}`;

    // Attach click event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const index = target.getAttribute('data-index');
            deleteCartItem(index);
        });
    });
}

// Function to create a cart item HTML element
function createCartItemElement(item: CartItem, index: number): HTMLLIElement {
    const cartItem = document.createElement('li');
    const product = item.product;
    const quantity = item.quantity;

    cartItem.classList.add('cart-item');
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

    return cartItem;
}

// Function to delete a cart item by index
function deleteCartItem(index: string | null) {
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
const sampleProduct: Product = {
    title: 'Sample Product',
    description: 'A sample product description.',
    price: 20.99,
    image: 'sample-image.jpg',
};

const sampleCartItem: CartItem = {
    product: sampleProduct,
    quantity: 2,
};

cart.push(sampleCartItem);
cartTotals += sampleProduct.price * sampleCartItem.quantity;

// Initial update of the cart display
updateCartDisplay();
