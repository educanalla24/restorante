// Obtener parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const mesaId = urlParams.get('mesa') || '1';

// Estado de la aplicación
let menu = [];
let cart = [];
let API_URL = '';

// Detectar URL base automáticamente
const getApiUrl = () => {
    const port = window.location.port;
    if (port) {
        return `${window.location.protocol}//${window.location.hostname}:${port}/api`;
    }
    return `${window.location.protocol}//${window.location.hostname}/api`;
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    API_URL = getApiUrl();
    document.getElementById('mesaNumero').textContent = mesaId;
    loadMenu();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    document.getElementById('confirmarPedido').addEventListener('click', confirmarPedido);
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
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <p>Error loading menu</p>
                <p style="font-size: 0.9em; margin-top: 10px;">Please reload the page</p>
            </div>
        `;
    }
}

// Render menu
function renderMenu() {
    const container = document.getElementById('menuContainer');
    
    if (menu.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🍽️</div>
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

    let html = '';
    Object.keys(categorias).forEach(categoria => {
        html += `<div class="card" style="margin-bottom: 20px;">`;
        html += `<h2>${categoria}</h2>`;
        html += `<div class="menu-grid">`;
        
        categorias[categoria].forEach(item => {
            const inCart = cart.find(c => c.id === item.id);
            html += `
                <div class="menu-item ${inCart ? 'selected' : ''}" data-id="${item.id}">
                    <span class="menu-item-category">${categoria}</span>
                    <div class="menu-item-name">${item.nombre}</div>
                    <div class="menu-item-description">${item.descripcion || ''}</div>
                    <div class="menu-item-footer">
                        <span class="menu-item-price">$${parseFloat(item.precio).toFixed(2)}</span>
                        <button class="btn btn-small btn-primary add-to-cart" data-id="${item.id}">
                            ${inCart ? '✓ Added' : '+ Add'}
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
    });

    container.innerHTML = html;

    // Add event listeners to buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = parseInt(btn.dataset.id);
            addToCart(itemId);
        });
    });

    // Add event listeners to menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn')) {
                const itemId = parseInt(item.dataset.id);
                addToCart(itemId);
            }
        });
    });
}

// Agregar al carrito
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
    renderMenu(); // Re-render to show "selected" state
    showNotification('Item added to cart', 'success');
}

// Remover del carrito
function removeFromCart(itemId) {
    cart = cart.filter(c => c.id !== itemId);
    updateCart();
    renderMenu();
}

// Actualizar cantidad en carrito
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

// Actualizar carrito
function updateCart() {
    const container = document.getElementById('cartItems');
    const confirmBtn = document.getElementById('confirmarPedido');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <p>Your cart is empty</p>
                <p style="font-size: 0.9em; margin-top: 10px;">Select items from the menu to add them</p>
            </div>
        `;
        confirmBtn.disabled = true;
    } else {
        let html = '';
        cart.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.nombre}</div>
                        <div class="cart-item-price">$${item.precio.toFixed(2)} each</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-value">${item.cantidad}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
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

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

