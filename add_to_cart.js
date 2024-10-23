if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}


function addToCart(id, name, price) {
    
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    
    alert('Item added to cart!');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function updateQuantity(id, change) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeFromCart(id);
            return;
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalItems = document.getElementById('total-items');
    const totalAmount = document.getElementById('total-amount');
    
    if (!cartItems) return; 
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        totalItems.textContent = '0';
        totalAmount.textContent = '0';
        return;
    }
    
    let itemsTotal = 0;
    let amountTotal = 0;
    
    cart.forEach(item => {
        itemsTotal += item.quantity;
        amountTotal += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>${item.name}</div>
            <div>₹${item.price}</div>
            <div class="quantity-controls">
                <button onclick="updateQuantity('${item.id}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
            <div>₹${item.price * item.quantity}</div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    totalItems.textContent = itemsTotal;
    totalAmount.textContent = amountTotal;
}

function checkout() {
    alert('Thank you for your purchase! This is where you would implement payment processing.');
    localStorage.setItem('cart', JSON.stringify([]));
    displayCart();
}

document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateCartCount();
});