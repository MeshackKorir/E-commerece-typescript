interface Product {
    names: string;
    image: string;
    price: number;
    title: string;
    date_established: string;
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
  
    cartItems.innerHTML = '';
  
    cart.forEach((item, index) => {
      const cartItem = createCartItemElement(item, index);
      cartItems.appendChild(cartItem);
    });
  
    cartTotalDisplay.textContent = `$${cartTotals.toFixed(2)}`;
  
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const index = target.getAttribute('data-index');
        deleteCartItem(index);
      });
    });
  }
  
  function createCartItemElement(item: CartItem, index: number): HTMLLIElement {
    const cartItem = document.createElement('li');
    const product = item.product;
    const quantity = item.quantity;
  
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.names}">
        <div>
            <h3>${product.names}</h3>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${quantity}</p>
        </div>
        <button class="delete-button" data-index="${index}">Delete</button>
    `;
  
    return cartItem;
  }
  
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
  
  const sampleProduct: Product = {
    names: 'Sample Product',
    image: 'sample-image.jpg',
    price: 20.99,
    title: 'Sample Product',
    date_established: '2024-01-31',
  };
  
  const sampleCartItem: CartItem = {
    product: sampleProduct,
    quantity: 2,
  };
  
  cart.push(sampleCartItem);
  cartTotals += sampleProduct.price * sampleCartItem.quantity;
  
  updateCartDisplay();
  