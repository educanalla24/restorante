// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const mesaId = urlParams.get('mesa') || '1';

// Application state
let menu = [];
let cart = [];
let API_URL = '';
let activeCategory = '';
let currentModalItem = null;
let modalQuantity = 1;
let modalModifiers = {}; // Store selected modifiers {groupId: [selectedOptionIds]}
let availableModifiers = []; // Store available modifiers for current item

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
    // mesaNumero element removed from HTML, but keeping mesaId for order tracking
    loadMenu();
    setupEventListeners();
    setupLogo();
});

// Setup restaurant logo
function setupLogo() {
    const logoImg = document.getElementById('restaurantLogoImg');
    const logoName = document.getElementById('restaurantName');
    
    // Try different logo paths
    const logoPaths = [
        'logo2.png',
        '../logo2.png',
        '../../logo2.png',
        'images/logo2.png',
        '../images/logo2.png'
    ];
    
    let currentPathIndex = 0;
    
    function tryNextLogo() {
        if (currentPathIndex < logoPaths.length) {
            logoImg.src = logoPaths[currentPathIndex];
            currentPathIndex++;
        } else {
            // If no logo found, show text
            logoImg.style.display = 'none';
            logoName.style.display = 'block';
        }
    }
    
    logoImg.onerror = tryNextLogo;
    logoImg.onload = () => {
        logoImg.style.display = 'block';
        logoName.style.display = 'none';
    };
    
    // Start trying logos
    tryNextLogo();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('confirmarPedido').addEventListener('click', confirmarPedido);
    document.getElementById('viewCartBtn').addEventListener('click', openCart);
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
    document.getElementById('searchMenuBtn').addEventListener('click', openSearchModal);
    document.getElementById('closeSearchModalBtn').addEventListener('click', closeSearchModal);
    document.getElementById('searchModalOverlay').addEventListener('click', closeSearchModal);
    document.getElementById('searchInput').addEventListener('input', handleSearchInput);
    document.getElementById('searchInput').addEventListener('keydown', handleSearchKeydown);
    document.getElementById('closeCartBtn').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
    document.getElementById('closeProductModal').addEventListener('click', closeProductModal);
    document.getElementById('productModalOverlay').addEventListener('click', closeProductModal);
    document.getElementById('addToCartModalBtn').addEventListener('click', addToCartFromModal);
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

// Category order
const categoryOrder = [
    'Coffee/Tea',
    'Cold Bevs',
    'Iced Drinks',
    'Display',
    'Acai Bowl',
    'Breakfast',
    'Bread',
    'Quick Bite',
    'Salads',
    'Omelette',
    'Burgers | Sandwiches | Wraps',
    'Just Seafood',
    'Little Nippers'
];

// Sort categories according to predefined order
function sortCategories(categories) {
    const ordered = [];
    const unordered = [];
    
    // Add categories in order
    categoryOrder.forEach(cat => {
        if (categories.includes(cat)) {
            ordered.push(cat);
        }
    });
    
    // Add any remaining categories that weren't in the order list
    categories.forEach(cat => {
        if (!categoryOrder.includes(cat)) {
            unordered.push(cat);
        }
    });
    
    return [...ordered, ...unordered];
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
    const categoryKeys = sortCategories(Object.keys(categorias));
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
            html += `
                <div class="menu-item-card" data-id="${item.id}" onclick="openProductModal(${item.id})">
                    <div class="menu-item-left">
                        <div class="menu-item-name">${item.nombre}</div>
                        ${item.descripcion ? `<div class="menu-item-description">${item.descripcion}</div>` : ''}
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
                        <div class="menu-item-price">$${parseFloat(item.precio).toFixed(2)}</div>
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

// Clear entire cart
function clearCart() {
    if (cart.length === 0) {
        showNotification('Cart is already empty', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear the entire cart?')) {
        cart = [];
        updateCart();
        renderMenu();
        showNotification('Cart cleared', 'success');
    }
}

// Update quantity in cart
function updateQuantity(itemId, delta, index) {
    // If index is provided, use it directly (more reliable)
    if (index !== undefined && cart[index]) {
        cart[index].cantidad += delta;
        if (cart[index].cantidad <= 0) {
            cart.splice(index, 1);
        }
        updateCart();
        return;
    }

    // Fallback: find by id (may have issues with duplicate items)
    const item = cart.find(c => c.id === itemId);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        const itemIndex = cart.findIndex(c => c.id === itemId);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCart();
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
        cart.forEach((item, index) => {
            html += `
                <div class="cart-item-card">
                    <div class="cart-item-header">
                        <div class="cart-item-name">${item.nombre}</div>
                        <div class="cart-item-price">$${(item.precio * item.cantidad).toFixed(2)}</div>
                    </div>
                    ${item.modifiers && item.modifiers.length > 0 ? `
                        <div class="cart-item-modifiers">
                            ${item.modifiers.map(m => `<span class="modifier-badge">${m.name}${m.price > 0 ? ` (+$${m.price.toFixed(2)})` : ''}</span>`).join('')}
                        </div>
                    ` : ''}
                    ${item.notas && item.notas.trim() ? `<div class="cart-item-notes">📝 ${item.notas}</div>` : ''}
                    <div class="cart-item-controls">
                        <button class="quantity-control-btn" onclick="updateQuantity(${item.id}, -1, ${index})">−</button>
                        <span class="quantity-display">${item.cantidad}</span>
                        <button class="quantity-control-btn" onclick="updateQuantity(${item.id}, 1, ${index})">+</button>
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
    
    // Enable/disable clear cart button
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.disabled = cart.length === 0;
        clearCartBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
        clearCartBtn.style.cursor = cart.length === 0 ? 'not-allowed' : 'pointer';
    }
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

// Open search modal
function openSearchModal() {
    document.getElementById('searchModal').classList.add('open');
    document.getElementById('searchModalOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
    document.getElementById('searchInput').focus();
    // Clear previous search
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '<div class="search-placeholder">Start typing to search...</div>';
}

// Close search modal
function closeSearchModal() {
    document.getElementById('searchModal').classList.remove('open');
    document.getElementById('searchModalOverlay').classList.remove('show');
    document.body.style.overflow = '';
    document.getElementById('searchInput').value = '';
}

// Handle search input
function handleSearchInput(e) {
    const query = e.target.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (query.length === 0) {
        resultsContainer.innerHTML = '<div class="search-placeholder">Start typing to search...</div>';
        return;
    }
    
    // Search in menu items
    const results = menu.filter(item => {
        const nameMatch = item.nombre.toLowerCase().includes(query);
        const descMatch = item.descripcion && item.descripcion.toLowerCase().includes(query);
        const categoryMatch = item.categoria.toLowerCase().includes(query);
        return nameMatch || descMatch || categoryMatch;
    });
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-no-results">No items found matching "' + query + '"</div>';
        return;
    }
    
    // Render results
    let html = '';
    results.forEach(item => {
        html += `
            <div class="search-result-item" onclick="selectSearchResult(${item.id})">
                <div>
                    <div class="search-result-name">${item.nombre}</div>
                    <div class="search-result-category">${item.categoria}</div>
                </div>
                <div class="search-result-price">$${parseFloat(item.precio).toFixed(2)}</div>
            </div>
        `;
    });
    resultsContainer.innerHTML = html;
}

// Handle search input keyboard events
function handleSearchKeydown(e) {
    if (e.key === 'Escape') {
        closeSearchModal();
    }
}

// Select search result
function selectSearchResult(itemId) {
    closeSearchModal();
    openProductModal(itemId);
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
            cantidad: item.cantidad,
            notas: item.notas || '',
            modifiers: item.modifiers || null,
            basePrice: item.basePrice || item.precio
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

// Open product modal
async function openProductModal(itemId) {
    const item = menu.find(m => m.id === itemId);
    if (!item) return;

    currentModalItem = item;
    modalQuantity = 1;
    modalModifiers = {};

    // Populate modal
    document.getElementById('modalProductName').textContent = item.nombre;
    document.getElementById('modalProductPrice').textContent = `$${parseFloat(item.precio).toFixed(2)}`;
    
    const descriptionEl = document.getElementById('modalProductDescription');
    if (item.descripcion && item.descripcion.trim()) {
        descriptionEl.textContent = item.descripcion;
        descriptionEl.style.display = 'block';
    } else {
        descriptionEl.style.display = 'none';
    }

    // Clear notes
    document.getElementById('modalProductNotes').value = '';

    // Load modifiers for this category
    await loadModifiers(item.categoria);

    // Update quantity and total
    updateModalQuantity();

    // Show modal
    document.getElementById('productModal').classList.add('open');
    document.getElementById('productModalOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Load modifiers for a category
async function loadModifiers(category) {
    try {
        const response = await fetch(`${API_URL}/modifiers/${encodeURIComponent(category)}`);
        if (!response.ok) {
            availableModifiers = [];
            renderModifiers();
            return;
        }
        
        availableModifiers = await response.json();
        renderModifiers();
    } catch (error) {
        console.error('Error loading modifiers:', error);
        availableModifiers = [];
        renderModifiers();
    }
}

// Render modifiers in modal
function renderModifiers() {
    const container = document.getElementById('modalProductOptions');
    
    if (!availableModifiers || availableModifiers.length === 0) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';
    let html = '';

    // Sort modifiers: "Size" always first, then others by their original order
    const sortedModifiers = [...availableModifiers].sort((a, b) => {
        if (a.group === 'Size') return -1;
        if (b.group === 'Size') return 1;
        return 0; // Keep original order for others
    });

    sortedModifiers.forEach(group => {
        const groupId = sanitizeGroupId(group.group);
        const hasSelection = modalModifiers[group.group] && modalModifiers[group.group].length > 0;
        const collapsedClass = hasSelection ? '' : 'collapsed';
        const toggleIcon = hasSelection ? '▲' : '▼';
        html += `
            <div class="modifier-group">
                <div class="modifier-group-header" onclick="toggleModifierGroup('${group.group.replace(/'/g, "\\'")}')">
                    <div class="modifier-group-title">
                        <h3>${group.group}</h3>
                        <span class="modifier-group-hint">${group.is_multiple ? 'Select multiple (Optional)' : 'Select one (Optional)'}</span>
                    </div>
                    <span class="modifier-group-toggle">${toggleIcon}</span>
                </div>
                <div class="modifier-options ${collapsedClass}" id="modifier-options-${groupId}">
        `;

        group.options.forEach(option => {
            const isSelected = modalModifiers[group.group] && modalModifiers[group.group].includes(option.id);
            html += `
                <label class="modifier-option ${isSelected ? 'selected' : ''}">
                    <input type="${group.is_multiple ? 'checkbox' : 'radio'}" 
                           name="modifier_${group.group}" 
                           value="${option.id}"
                           data-group="${group.group}"
                           data-price="${option.price}"
                           ${isSelected ? 'checked' : ''}
                           onchange="handleModifierChange('${group.group}', ${option.id}, ${option.price}, ${group.is_multiple})">
                    <span class="modifier-option-name">${option.name}</span>
                    ${option.price > 0 ? `<span class="modifier-option-price">+$${option.price.toFixed(2)}</span>` : ''}
                </label>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Sanitize group ID for use in HTML
function sanitizeGroupId(group) {
    return group.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
}

// Toggle modifier group expand/collapse
function toggleModifierGroup(group) {
    const groupId = sanitizeGroupId(group);
    const optionsContainer = document.getElementById(`modifier-options-${groupId}`);
    if (!optionsContainer) return;
    
    const header = optionsContainer.previousElementSibling;
    const toggleIcon = header.querySelector('.modifier-group-toggle');
    
    if (optionsContainer.classList.contains('collapsed')) {
        optionsContainer.classList.remove('collapsed');
        toggleIcon.textContent = '▲';
    } else {
        optionsContainer.classList.add('collapsed');
        toggleIcon.textContent = '▼';
    }
}

// Expand modifier group (used when a modifier is selected)
function expandModifierGroup(group) {
    const groupId = sanitizeGroupId(group);
    const optionsContainer = document.getElementById(`modifier-options-${groupId}`);
    if (!optionsContainer) return;
    
    if (optionsContainer.classList.contains('collapsed')) {
        const header = optionsContainer.previousElementSibling;
        const toggleIcon = header.querySelector('.modifier-group-toggle');
        optionsContainer.classList.remove('collapsed');
        toggleIcon.textContent = '▲';
    }
}

// Handle modifier selection change
function handleModifierChange(group, optionId, price, isMultiple) {
    if (!modalModifiers[group]) {
        modalModifiers[group] = [];
    }

    if (isMultiple) {
        // Toggle for checkboxes
        const index = modalModifiers[group].indexOf(optionId);
        if (index > -1) {
            modalModifiers[group].splice(index, 1);
        } else {
            modalModifiers[group].push(optionId);
        }
    } else {
        // Single selection for radio buttons
        modalModifiers[group] = [optionId];
    }

    // Expand the group when a modifier is selected
    expandModifierGroup(group);
    
    // Expand the group when a modifier is selected
    expandModifierGroup(group);
    
    // Update UI
    renderModifiers();
    updateModalQuantity();
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('open');
    document.getElementById('productModalOverlay').classList.remove('show');
    document.body.style.overflow = '';
    currentModalItem = null;
    modalQuantity = 1;
    modalModifiers = {};
    availableModifiers = [];
}

// Increase modal quantity
function increaseModalQuantity() {
    modalQuantity++;
    updateModalQuantity();
}

// Decrease modal quantity
function decreaseModalQuantity() {
    if (modalQuantity > 1) {
        modalQuantity--;
        updateModalQuantity();
    }
}

// Update modal quantity display and total
function updateModalQuantity() {
    document.getElementById('modalQuantity').textContent = modalQuantity;
    if (currentModalItem) {
        // Calculate base price
        let basePrice = parseFloat(currentModalItem.precio);
        
        // Add modifier prices
        let modifierTotal = 0;
        Object.values(modalModifiers).forEach(selectedIds => {
            selectedIds.forEach(optionId => {
                // Find the option price
                availableModifiers.forEach(group => {
                    const option = group.options.find(opt => opt.id === optionId);
                    if (option) {
                        modifierTotal += option.price;
                    }
                });
            });
        });
        
        const total = (basePrice + modifierTotal) * modalQuantity;
        document.getElementById('modalTotalPrice').textContent = total.toFixed(2);
    }
}

// Add to cart from modal
function addToCartFromModal() {
    if (!currentModalItem) return;

    const notes = document.getElementById('modalProductNotes').value.trim();
    
    // Calculate total price with modifiers
    let basePrice = parseFloat(currentModalItem.precio);
    let modifierTotal = 0;
    let selectedModifiers = [];
    
    Object.keys(modalModifiers).forEach(group => {
        modalModifiers[group].forEach(optionId => {
            availableModifiers.forEach(modGroup => {
                const option = modGroup.options.find(opt => opt.id === optionId);
                if (option) {
                    modifierTotal += option.price;
                    selectedModifiers.push({
                        group: modGroup.group,
                        name: option.name,
                        price: option.price
                    });
                }
            });
        });
    });
    
    const finalPrice = basePrice + modifierTotal;
    
    // Create unique key including modifiers and notes
    const modifiersKey = JSON.stringify(selectedModifiers.sort((a, b) => a.group.localeCompare(b.group)));
    const itemKey = `${currentModalItem.id}_${modifiersKey}_${notes}`;

    // Check if same item with same modifiers and notes exists
    const existingItem = cart.find(c => {
        const cModifiersKey = c.modifiers ? JSON.stringify(c.modifiers.sort((a, b) => a.group.localeCompare(b.group))) : '';
        const cKey = `${c.id}_${cModifiersKey}_${c.notas || ''}`;
        return cKey === itemKey;
    });

    if (existingItem) {
        existingItem.cantidad += modalQuantity;
    } else {
        cart.push({
            id: currentModalItem.id,
            nombre: currentModalItem.nombre,
            precio: finalPrice,
            cantidad: modalQuantity,
            notas: notes,
            modifiers: selectedModifiers.length > 0 ? selectedModifiers : null,
            basePrice: basePrice
        });
    }

    updateCart();
    renderMenu();
    closeProductModal();
    showNotification('Item added to cart', 'success');
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
