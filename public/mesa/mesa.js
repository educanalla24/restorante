// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const mesaId = urlParams.get('mesa') || '1';

// Application state
let menu = [];
let cart = [];
let API_URL = '';
let activeCategory = '';

// Detect base URL automatically
const getApiUrl = () => {
    const port = window.location.port;
    if (port) {
        return `${window.location.protocol}//${window.location.hostname}:${port}/api`;
    }
    return `${window.location.protocol}//${window.location.hostname}/api`;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    API_URL = getApiUrl();
    document.getElementById('mesaNumero').textContent = mesaId;
    loadMenu();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('confirmarPedido').addEventListener('click', confirmarPedido);
    document.getElementById('viewCartBtn').addEventListener('click', openCart);
    document.getElementById('closeCartBtn').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
}

// Load menu
async function loadMenu() {
    try {
        const response = await fetch(`${API_URL}/menu`);
        if (!response.ok) {
            throw new Error('Error loading menu');
        }
        menu = await response.json();
        renderMenu();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('menuContainer').innerHTML = `
            <div class="loading">
                <p>Error loading menu</p>
                <p style="font-size: 0.9em; margin-top: 10px;">Please reload the page</p>
            </div>
        `;
    }
}

// Render menu
function renderMenu() {
    const container = document.getElementById('menuContainer');
    const categoriesContainer = document.getElementById('menuCategories');
    
    if (menu.length === 0) {
        container.innerHTML = `
            <div class="loading">
                <p>No items available in the menu</p>
            </div>
        `;
        return;
    }

    // Group by category
    const categorias = {};
    menu.forEach(item => {
        if (!categorias[item.categoria]) {
            categorias[item.categoria] = [];
        }
        categorias[item.categoria].push(item);
    });

    // Render category buttons
    const categoryKeys = Object.keys(categorias);
    if (categoryKeys.length > 0 && !activeCategory) {
        activeCategory = categoryKeys[0];
    }

    let categoriesHtml = '';
    categoryKeys.forEach(cat => {
        categoriesHtml += `
            <button class="category-btn ${cat === activeCategory ? 'active' : ''}" 
                    data-category="${cat}" 
                    onclick="filterByCategory('${cat}')">
                ${cat}
            </button>
        `;
    });
    categoriesContainer.innerHTML = categoriesHtml;

    // Render menu items
    let html = '';
    categoryKeys.forEach(categoria => {
        html += `<div class="menu-category-section" data-category="${categoria}">`;
        html += `<h2 class="category-title">${categoria}</h2>`;
        html += `<div class="menu-items-list">`;
        
        categorias[categoria].forEach(item => {
            const inCart = cart.find(c => c.id === item.id);
            html += `
                <div class="menu-item-card" data-id="${item.id}">
                    <div class="menu-item-left">
                        <div class="menu-item-name">${item.nombre}</div>
                        ${item.descripcion ? `<div class="menu-item-description">${item.descripcion}</div>` : ''}
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
                        <div class="menu-item-price">$${parseFloat(item.precio).toFixed(2)}</div>
                        <button class="menu-item-add-btn ${inCart ? 'added' : ''}" 
                                data-id="${item.id}" 
                                onclick="addToCart(${item.id})">
                            ${inCart ? '✓ Added' : '+ Add'}
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
    });

    container.innerHTML = html;
    filterByCategory(activeCategory);
    updateCartHeader();
}

// Filter by category
function filterByCategory(category) {
    activeCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // Show/hide category sections
    document.querySelectorAll('.menu-category-section').forEach(section => {
        if (section.dataset.category === category) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add to cart
function addToCart(itemId) {
    const item = menu.find(m => m.id === itemId);
    if (!item) return;

    const existingItem = cart.find(c => c.id === itemId);
    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        cart.push({
            id: item.id,
            nombre: item.nombre,
            precio: parseFloat(item.precio),
            cantidad: 1
        });
    }

    updateCart();
    renderMenu(); // Re-render to show "added" state
    showNotification('Item added to cart', 'success');
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(c => c.id !== itemId);
    updateCart();
    renderMenu();
}

// Update quantity in cart
function updateQuantity(itemId, delta) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        removeFromCart(itemId);
    } else {
        updateCart();
    }
}

// Update cart
function updateCart() {
    const container = document.getElementById('cartItems');
    const confirmBtn = document.getElementById('confirmarPedido');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <p class="empty-cart-subtitle">Select items from the menu to add them</p>
            </div>
        `;
        confirmBtn.disabled = true;
    } else {
        let html = '';
        cart.forEach(item => {
            html += `
                <div class="cart-item-card">
                    <div class="cart-item-header">
                        <div class="cart-item-name">${item.nombre}</div>
                        <div class="cart-item-price">$${(item.precio * item.cantidad).toFixed(2)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-control-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span class="quantity-display">${item.cantidad}</span>
                        <button class="quantity-control-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
        confirmBtn.disabled = false;
    }

    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
    
    updateCartHeader();
}

// Update cart header
function updateCartHeader() {
    const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    document.getElementById('headerTotal').textContent = total.toFixed(2);
}

// Open cart sidebar
function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close cart sidebar
function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('show');
    document.body.style.overflow = '';
}

// Confirm order
async function confirmarPedido() {
    if (cart.length === 0) return;

    const btn = document.getElementById('confirmarPedido');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const notas = document.getElementById('notas').value.trim();
    const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    const pedido = {
        mesa_id: mesaId,
        items: cart.map(item => ({
            id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad
        })),
        total: total,
        notas: notas
    };

    try {
        const response = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error creating order');
        }

        const data = await response.json();
        showNotification('Order sent successfully! 🎉', 'success');
        
        // Clear cart
        cart = [];
        updateCart();
        document.getElementById('notas').value = '';
        closeCart();
        
        // Re-render menu
        renderMenu();

    } catch (error) {
        console.error('Error:', error);
        showNotification('Error sending order. Please try again.', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Confirm Order';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
