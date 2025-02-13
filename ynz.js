// Data Menu
const menu = {
    makanan: [
        { id: 1, name: "Nasi Goreng", price: 25000 },
        { id: 2, name: "Mie Goreng", price: 20000 },
        { id: 3, name: "Ayam Bakar", price: 30000 }
    ],
    minuman: [
        { id: 4, name: "Es Teh", price: 5000 },
        { id: 5, name: "Es Jeruk", price: 7000 },
        { id: 6, name: "Air Mineral", price: 3000 }
    ]
};

let cart = [];

// Render Menu
function renderMenu() {
    const foodMenu = document.getElementById('food-menu');
    const drinkMenu = document.getElementById('drink-menu');

    foodMenu.innerHTML = '';
    drinkMenu.innerHTML = '';

    menu.makanan.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('menu-item');
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Rp ${item.price}</p>
            <input type="number" id="qty-${item.id}" min="1" value="1">
            <button onclick="addToCart(${item.id}, 'makanan')">Tambah ke Keranjang</button>
        `;
        foodMenu.appendChild(itemElement);
    });

    menu.minuman.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('menu-item');
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Rp ${item.price}</p>
            <input type="number" id="qty-${item.id}" min="1" value="1">
            <button onclick="addToCart(${item.id}, 'minuman')">Tambah ke Keranjang</button>
        `;
        drinkMenu.appendChild(itemElement);
    });
}

// Tambah ke Keranjang
function addToCart(itemId, category) {
    const item = menu[category].find(i => i.id === itemId);
    const quantity = parseInt(document.getElementById(`qty-${itemId}`).value);

    if (item && quantity > 0) {
        const cartItem = cart.find(i => i.id === itemId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ ...item, quantity });
        }
        renderCart();
    }
}

// Render Keranjang
function renderCart() {
    const cartContainer = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <span>Rp ${item.price * item.quantity}</span>
        `;
        cartContainer.appendChild(cartItemElement);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice;
}

// Fitur Chat
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatInput.value.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = `Anda: ${chatInput.value}`;
        chatMessages.appendChild(messageElement);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll ke pesan terbaru
    }
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});