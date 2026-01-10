// Cashier Terminal - Stripe Terminal Integration

let terminal = null;
let reader = null;
let selectedOrder = null;
let currentPaymentIntent = null;
let API_URL = '';

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
    setupEventListeners();
    loadPendingOrders();
    
    // Initialize Stripe Terminal
    initializeTerminal();
});

// Initialize Stripe Terminal
async function initializeTerminal() {
    try {
        // Get Stripe publishable key
        const configResponse = await fetch(`${API_URL}/stripe-config`);
        if (!configResponse.ok) {
            throw new Error('Failed to get Stripe config');
        }
        
        const config = await configResponse.json();
        const publishableKey = config.publishableKey;
        
        if (!publishableKey) {
            updateTerminalStatus('disconnected', 'Stripe not configured');
            return;
        }
        
        // Initialize Terminal
        terminal = StripeTerminal.create({
            onFetchConnectionToken: async () => {
                const response = await fetch(`${API_URL}/terminal/connection-token`, {
                    method: 'POST'
                });
                const data = await response.json();
                return data.secret;
            },
            onUnexpectedReaderDisconnect: () => {
                updateTerminalStatus('disconnected', 'Reader disconnected');
                reader = null;
            }
        });
        
        updateTerminalStatus('disconnected', 'Terminal ready - Connect reader');
    } catch (error) {
        console.error('Error initializing Terminal:', error);
        updateTerminalStatus('disconnected', 'Failed to initialize Terminal');
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('connectTerminalBtn').addEventListener('click', discoverAndConnectReader);
    document.getElementById('processPaymentBtn').addEventListener('click', processPayment);
    document.getElementById('cancelPaymentBtn').addEventListener('click', cancelPayment);
}

// Update terminal status display
function updateTerminalStatus(status, message) {
    const statusEl = document.getElementById('terminalStatus');
    statusEl.className = `terminal-status ${status}`;
    statusEl.textContent = message;
}

// Load pending orders
async function loadPendingOrders() {
    try {
        const response = await fetch(`${API_URL}/pedidos?estado=pendiente`);
        if (!response.ok) {
            throw new Error('Failed to load orders');
        }
        
        const orders = await response.json();
        renderPendingOrders(orders);
    } catch (error) {
        console.error('Error loading orders:', error);
        document.getElementById('pendingOrdersList').innerHTML = `
            <div style="text-align: center; padding: 20px; color: #999;">
                Error loading orders
            </div>
        `;
    }
}

// Render pending orders
function renderPendingOrders(orders) {
    const container = document.getElementById('pendingOrdersList');
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #999;">
                No pending orders
            </div>
        `;
        return;
    }
    
    let html = '';
    orders.forEach(order => {
        const fecha = new Date(order.created_at).toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        html += `
            <div class="order-card-terminal" onclick="selectOrder(${order.id})" data-order-id="${order.id}">
                <h3>Table ${order.mesa_id}</h3>
                <div style="font-size: 0.9em; color: #666; margin-bottom: 10px;">${fecha}</div>
                <div style="font-size: 0.85em; color: #999;">
                    ${Array.isArray(order.items) ? order.items.length : 0} item(s)
                </div>
                <div class="order-total">$${parseFloat(order.total || 0).toFixed(2)}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Select order for payment
async function selectOrder(orderId) {
    try {
        // Remove previous selection
        document.querySelectorAll('.order-card-terminal').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Highlight selected order
        const card = document.querySelector(`[data-order-id="${orderId}"]`);
        if (card) {
            card.classList.add('selected');
        }
        
        // Fetch order details
        const response = await fetch(`${API_URL}/pedidos`);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        
        const orders = await response.json();
        selectedOrder = orders.find(o => o.id === orderId);
        
        if (!selectedOrder) {
            throw new Error('Order not found');
        }
        
        // Display order info
        displaySelectedOrder(selectedOrder);
        
        // Show payment controls
        document.getElementById('noOrderSelected').style.display = 'none';
        document.getElementById('selectedOrderInfo').style.display = 'block';
        document.getElementById('paymentControls').style.display = 'block';
        
    } catch (error) {
        console.error('Error selecting order:', error);
        showNotification('Error loading order details', 'error');
    }
}

// Display selected order
function displaySelectedOrder(order) {
    document.getElementById('selectedOrderTable').textContent = `Table ${order.mesa_id}`;
    document.getElementById('selectedOrderTotal').textContent = `$${parseFloat(order.total || 0).toFixed(2)}`;
    document.getElementById('paymentAmount').textContent = `$${parseFloat(order.total || 0).toFixed(2)}`;
    
    // Display order items
    let itemsHtml = '';
    if (Array.isArray(order.items)) {
        order.items.forEach(item => {
            const precio = typeof item.precio === 'number' ? item.precio : parseFloat(item.precio);
            const cantidad = item.cantidad || 1;
            itemsHtml += `
                <div style="margin-bottom: 8px; font-size: 0.9em;">
                    ${item.nombre} x${cantidad} - $${(precio * cantidad).toFixed(2)}
                </div>
            `;
        });
    }
    document.getElementById('selectedOrderItems').innerHTML = itemsHtml;
}

// Discover and connect to Terminal reader
async function discoverAndConnectReader() {
    if (!terminal) {
        showNotification('Terminal not initialized', 'error');
        return;
    }
    
    const btn = document.getElementById('connectTerminalBtn');
    btn.disabled = true;
    btn.textContent = 'Discovering readers...';
    updateTerminalStatus('connecting', 'Discovering readers...');
    
    try {
        // Discover readers
        const discoveryResult = await terminal.discoverReaders({
            simulated: false, // Production mode - uses real hardware
            location: null // You can specify a location ID if you have multiple locations
        });
        
        if (discoveryResult.error) {
            throw new Error(discoveryResult.error.message);
        }
        
        if (discoveryResult.discoveredReaders.length === 0) {
            throw new Error('No readers found');
        }
        
        // Connect to first available reader
        const connectResult = await terminal.connectReader(discoveryResult.discoveredReaders[0]);
        
        if (connectResult.error) {
            throw new Error(connectResult.error.message);
        }
        
        reader = connectResult.reader;
        updateTerminalStatus('connected', `Connected: ${reader.label || 'Terminal Reader'}`);
        btn.textContent = 'Reader Connected';
        btn.disabled = true;
        
        // Enable process payment button if order is selected
        if (selectedOrder) {
            document.getElementById('processPaymentBtn').disabled = false;
        }
        
        showNotification('Terminal reader connected successfully', 'success');
        
    } catch (error) {
        console.error('Error connecting reader:', error);
        updateTerminalStatus('disconnected', 'Connection failed');
        btn.disabled = false;
        btn.textContent = 'Connect Terminal Reader';
        showNotification(`Connection error: ${error.message}`, 'error');
    }
}

// Process payment
async function processPayment() {
    if (!selectedOrder) {
        showNotification('Please select an order first', 'error');
        return;
    }
    
    if (!reader) {
        showNotification('Please connect terminal reader first', 'error');
        return;
    }
    
    const btn = document.getElementById('processPaymentBtn');
    btn.disabled = true;
    btn.textContent = 'Processing...';
    
    const statusEl = document.getElementById('paymentStatus');
    statusEl.style.display = 'block';
    statusEl.className = 'payment-status processing';
    statusEl.textContent = 'Creating payment...';
    
    try {
        // Create payment intent
        const intentResponse = await fetch(`${API_URL}/terminal/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: selectedOrder.total,
                order_id: selectedOrder.id,
                mesa_id: selectedOrder.mesa_id
            })
        });
        
        if (!intentResponse.ok) {
            const error = await intentResponse.json();
            throw new Error(error.details || error.error || 'Failed to create payment intent');
        }
        
        const { clientSecret, paymentIntentId } = await intentResponse.json();
        currentPaymentIntent = paymentIntentId;
        
        statusEl.textContent = 'Please present card or tap...';
        
        // Collect payment
        const collectResult = await terminal.collectPaymentMethod(clientSecret);
        
        if (collectResult.error) {
            throw new Error(collectResult.error.message);
        }
        
        statusEl.textContent = 'Processing payment...';
        
        // Process payment
        const processResult = await terminal.processPayment(collectResult.paymentIntent);
        
        if (processResult.error) {
            throw new Error(processResult.error.message);
        }
        
        // Confirm payment on server
        const confirmResponse = await fetch(`${API_URL}/terminal/confirm-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentIntentId: paymentIntentId,
                order_id: selectedOrder.id
            })
        });
        
        if (!confirmResponse.ok) {
            const error = await confirmResponse.json();
            throw new Error(error.details || error.error || 'Failed to confirm payment');
        }
        
        // Success!
        statusEl.className = 'payment-status success';
        statusEl.textContent = `Payment successful! $${(processResult.paymentIntent.amount / 100).toFixed(2)}`;
        
        showNotification('Payment processed successfully! 🎉', 'success');
        
        // Reset after 3 seconds
        setTimeout(() => {
            resetPayment();
            loadPendingOrders(); // Reload orders
        }, 3000);
        
    } catch (error) {
        console.error('Payment error:', error);
        statusEl.className = 'payment-status error';
        statusEl.textContent = `Error: ${error.message}`;
        btn.disabled = false;
        btn.textContent = 'Process Payment';
        showNotification(`Payment error: ${error.message}`, 'error');
    }
}

// Cancel payment
function cancelPayment() {
    resetPayment();
}

// Reset payment state
function resetPayment() {
    selectedOrder = null;
    currentPaymentIntent = null;
    
    document.getElementById('noOrderSelected').style.display = 'block';
    document.getElementById('selectedOrderInfo').style.display = 'none';
    document.getElementById('paymentControls').style.display = 'none';
    document.getElementById('paymentStatus').style.display = 'none';
    
    document.querySelectorAll('.order-card-terminal').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.getElementById('processPaymentBtn').disabled = true;
    document.getElementById('processPaymentBtn').textContent = 'Process Payment';
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

// Make selectOrder available globally
window.selectOrder = selectOrder;

