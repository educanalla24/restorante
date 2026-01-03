// Estado de la aplicación
let pedidos = [];
let filtroEstado = '';
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
    setupEventListeners();
    loadPedidos();
    
    // Auto-refrescar cada 5 segundos
    setInterval(loadPedidos, 5000);
});

// Configurar event listeners
function setupEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover active de todos
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // Agregar active al clickeado
            e.target.classList.add('active');
            filtroEstado = e.target.dataset.estado || '';
            loadPedidos();
        });
    });
}

// Load orders
async function loadPedidos() {
    try {
        const url = filtroEstado 
            ? `${API_URL}/pedidos?estado=${filtroEstado}`
            : `${API_URL}/pedidos`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error loading orders');
        }
        
        pedidos = await response.json();
        renderPedidos();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('ordersContainer').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <p>Error loading orders</p>
                <p style="font-size: 0.9em; margin-top: 10px;">Please reload the page</p>
            </div>
        `;
    }
}

// Render orders
function renderPedidos() {
    const container = document.getElementById('ordersContainer');
    
    if (pedidos.length === 0) {
        const estadoText = filtroEstado ? `with status "${filtroEstado}"` : '';
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <p>No orders ${estadoText}</p>
            </div>
        `;
        return;
    }

    let html = '<div class="orders-list">';
    
    pedidos.forEach(pedido => {
        const fecha = new Date(pedido.created_at).toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        html += `
            <div class="order-card ${pedido.estado}">
                <div class="order-header">
                    <div class="order-info">
                        <h3>Table ${pedido.mesa_id}</h3>
                        <div class="order-meta">${fecha}</div>
                    </div>
                    <span class="order-status ${pedido.estado}">${pedido.estado}</span>
                </div>
                
                <div class="order-items">
        `;

        // Show order items
        if (Array.isArray(pedido.items)) {
            pedido.items.forEach(item => {
                const precio = typeof item.precio === 'number' ? item.precio : parseFloat(item.precio);
                const cantidad = item.cantidad || 1;
                html += `
                    <div class="order-item">
                        <div style="flex: 1;">
                            <div class="order-item-name">${item.nombre}</div>
                            ${item.modifiers && item.modifiers.length > 0 ? `
                                <div style="font-size: 0.85em; color: var(--text-secondary); margin-top: 4px;">
                                    ${item.modifiers.map(m => `${m.name}${m.price > 0 ? ` (+$${m.price.toFixed(2)})` : ''}`).join(', ')}
                                </div>
                            ` : ''}
                            ${item.notas && item.notas.trim() ? `
                                <div style="font-size: 0.85em; color: var(--text-secondary); margin-top: 4px; font-style: italic;">
                                    📝 ${item.notas}
                                </div>
                            ` : ''}
                        </div>
                        <span class="order-item-quantity">x${cantidad}</span>
                        <span class="order-item-price">$${(precio * cantidad).toFixed(2)}</span>
                    </div>
                `;
            });
        }

        html += `
                </div>
        `;

        // Show notes if they exist
        if (pedido.notas && pedido.notas.trim()) {
            html += `
                <div style="margin-top: 10px; padding: 10px; background: #fff3e0; border-radius: 8px; font-style: italic; color: var(--text-secondary);">
                    📝 ${pedido.notas}
                </div>
            `;
        }

        html += `
                <div class="order-total">Total: $${parseFloat(pedido.total || 0).toFixed(2)}</div>
                
                <div class="order-actions">
        `;

        // Buttons according to status
        if (pedido.estado === 'pendiente') {
            html += `
                <button class="btn btn-secondary btn-small" onclick="updateEstado(${pedido.id}, 'preparando')">
                    🍳 Prepare
                </button>
                <button class="btn btn-success btn-small" onclick="updateEstado(${pedido.id}, 'listo')">
                    ✅ Mark Ready
                </button>
            `;
        } else if (pedido.estado === 'preparando') {
            html += `
                <button class="btn btn-success btn-small" onclick="updateEstado(${pedido.id}, 'listo')">
                    ✅ Mark Ready
                </button>
            `;
        } else if (pedido.estado === 'listo') {
            html += `
                <button class="btn btn-primary btn-small" onclick="updateEstado(${pedido.id}, 'entregado')">
                    ✓ Deliver
                </button>
            `;
        }

        // Cancel button (only if not delivered)
        if (pedido.estado !== 'entregado') {
            html += `
                <button class="btn btn-secondary btn-small" onclick="updateEstado(${pedido.id}, 'cancelado')" style="background: #d32f2f;">
                    ❌ Cancel
                </button>
            `;
        }

        html += `
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// Update order status
async function updateEstado(pedidoId, nuevoEstado) {
    try {
        const response = await fetch(`${API_URL}/pedidos/${pedidoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: nuevoEstado })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error updating order');
        }

        const estados = {
            'pendiente': 'Pending',
            'preparando': 'Preparing',
            'listo': 'Ready',
            'entregado': 'Delivered',
            'cancelado': 'Cancelled'
        };

        showNotification(`Order marked as "${estados[nuevoEstado]}"`, 'success');
        loadPedidos();
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error updating order', 'error');
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

