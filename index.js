document.addEventListener('DOMContentLoaded', () => {
    const colorModeToggle = document.getElementById('colorModeToggle');
    const currentMode = localStorage.getItem('colorMode') || 'light';

    // Apply the current mode
    if (currentMode === 'dark') {
        document.body.classList.add('dark-mode');
        colorModeToggle.textContent = 'Switch to Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        colorModeToggle.textContent = 'Switch to Dark Mode';
    }

    // Add event listener to the button
    colorModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('colorMode', 'light');
            colorModeToggle.textContent = 'Switch to Dark Mode';
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('colorMode', 'dark');
            colorModeToggle.textContent = 'Switch to Light Mode';
        }
    });
});

// Sample product data
const productData = {
    cosmetics: [
        { name: "Lipstick", price: 15.99, imgSrc: "path/to/lipstick.jpg" },
        { name: "Foundation", price: 25.99, imgSrc: "path/to/foundation.jpg" }
    ],
    utensils: [
        { name: "Cooking Pot", price: 39.99, imgSrc: "path/to/pot.jpg" },
        { name: "Spatula", price: 8.99, imgSrc: "path/to/spatula.jpg" }
    ],
    clothes: [
        { name: "Men's T-Shirt", price: 19.99, imgSrc: "path/to/tshirt.jpg" },
        { name: "Women's Dress", price: 49.99, imgSrc: "path/to/dress.jpg" }
    ],
    electronics: [
        { name: "Smartphone", price: 299.99, imgSrc: "path/to/smartphone.jpg" },
        { name: "Headphones", price: 89.99, imgSrc: "path/to/headphones.jpg" }
    ],
    schoolItems: [
        { name: "Encyclopedia", price: 120.00, imgSrc: "path/to/encyclopedia.jpg" },
        { name: "Exercise Book", price: 3.99, imgSrc: "path/to/exercise_book.jpg" }
    ],
    construction: [
        { name: "Wheelbarrow", price: 55.00, imgSrc: "path/to/wheelbarrow.jpg" },
        { name: "Spade", price: 15.00, imgSrc: "path/to/spade.jpg" }
    ],
    others: [
        { name: "Water Bottle", price: 7.99, imgSrc: "path/to/water_bottle.jpg" },
        { name: "Backpack", price: 39.99, imgSrc: "path/to/backpack.jpg" }
    ]
};

let cart = [];

// Function to show products based on selected category
function showCategory(category) {
    const categoryContent = document.getElementById('categoryContent');
    const productGrid = document.getElementById('productGrid');
    const products = productData[category] || [];

    categoryContent.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-item">
            <img src="${product.imgSrc}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        </div>
    `).join('');
}

// Function to add product to the cart
function addToCart(name, price) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Function to update the cart UI
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartItemCount = document.getElementById('cartItemCount');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
    cartItemCount.textContent = cart.length;
}

// Search function to filter products by name
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        if (itemName.includes(searchInput)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Handle adding new item
document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);

    if (name && !isNaN(price)) {
        // Adding product to the respective category in productData
        // For demo purposes, let's add it to 'others'
        productData.others.push({ name, price, imgSrc: 'path/to/default.jpg' });

        showCategory('others'); // Refresh category to include new product
        closeModal('addItemModal');
        document.getElementById('addItemForm').reset();
    }
});

// Handle checkout
function checkout() {
    alert('Thank you for your purchase! Your order has been placed.');
    cart.length = 0;
    updateCart();
}

// Function to open a modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Function to close a modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
