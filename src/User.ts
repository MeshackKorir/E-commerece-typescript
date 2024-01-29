interface Book {
  names: string;
  image: string;
  author: string;
  title: string;
  date_established: string;
}

type HTMLSpanElementWithClassName = HTMLSpanElement & { className: string };

class displayingProducts {
  private divProduct: HTMLDivElement;
  private cart: Book[];

  constructor() {
    this.divProduct = document.querySelector('.productsDiv') as HTMLDivElement;
    this.cart = this.loadCartFromLocalStorage(); // Initialize cart from localStorage
  }

  displayBooks(books: Book[]) {
    this.divProduct.innerHTML = '';

    books.forEach((book: Book, index: number) => {
      let newRow = document.createElement('div');
      newRow.className = "profiless";

      newRow.innerHTML = `
        <table>
          <tr class="tableheading" style="gap: 15px;">
            <th><img src="${book.image}" alt="Book Image"></th>
            <th>${book.names}</th>
            <th class="buttons">
            <button class="add-to-cart-btn" data-index="${index}" style="background-color: Brown; color: white;">Add to cart</button>
            </th>
          </tr>
        </table>
      `;

      this.divProduct.appendChild(newRow);
    });

    const addToCartButtons = this.divProduct.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index') || '0', 10);
        const storedBooks = localStorage.getItem('books');

        if (storedBooks) {
          const books: Book[] = JSON.parse(storedBooks);
          const selectedBook = books[index];
          this.addToCart(selectedBook);
          this.displayCart();
        }
      });
    });
  }

  addToCart(book: Book) {
    this.cart.push(book);
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
  }

  loadFromLocalStorageAndDisplay() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      const books: Book[] = JSON.parse(storedBooks);
      this.displayBooks(books);
    }
  }

  loadCartFromLocalStorage(): Book[] {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  displayCart() {
    const cartItems = document.getElementById('cart-items') as HTMLDivElement;
    const cartTotal = document.getElementById('cart-total') as HTMLSpanElementWithClassName;

    if (cartItems && cartTotal) {
      cartItems.innerHTML = "";
      let count = 0;

      this.cart.forEach((el, index) => {
        count += 1;

        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        let cartName = document.createElement('div');
        cartName.className = 'cart-name';
        cartName.textContent = el.names;

        let cartImg = document.createElement('img');
        cartImg.className = 'cart-img';
        cartImg.setAttribute('src', el.image);

        let cartPrice = document.createElement('div');
        cartPrice.className = 'cart-price';
        cartPrice.textContent = `Ksh ${el.title}`;

        let delItem = document.createElement('button');
        delItem.className = 'del-item';
        delItem.textContent = "Delete";

        delItem.style.color = 'Black';
        delItem.style.backgroundColor = 'red';
        delItem.style.fontSize = '30px';
        delItem.style.font = 'large';
        delItem.addEventListener('click', () => {
          this.delCartItem(index);
          count -= 1;
          cartTotal.textContent = count.toString();
        });

        cartItem.appendChild(cartName);
        cartItem.appendChild(cartImg);
        cartItem.appendChild(cartPrice);
        cartItem.appendChild(delItem);

        cartItems.appendChild(cartItem);
      });

      cartTotal.textContent = count.toString();
    }
  }

  delCartItem(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
    this.displayCart();
  }
}

let instances = new displayingProducts();
window.onload = () => {
  instances.loadFromLocalStorageAndDisplay();
  instances.displayCart();
};
