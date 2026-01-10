// Cargar variables de entorno si existe .env
try {
    require('dotenv').config();
} catch (e) {
    // dotenv no está instalado, continuar sin él
}

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Stripe configuration - Use environment variables for security
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Supabase
// Valores por defecto para desarrollo local
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://suwxhntjjuyvjuhhhupe.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1d3hobnRqanV5dmp1aGhodXBlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg2MzUwNiwiZXhwIjoyMDgyNDM5NTA2fQ.uVuliNKLxD7nEXAhAFPEBiNZR0W7kBYWoZqu0G2qdJk';

// Crear cliente de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve marketing page for root domain (yourturnai.com) - MUST be before static middleware
app.get('/', (req, res) => {
    // Check if request is for marketing page domain
    const host = req.get('host') || '';
    const serveMarketingPage = process.env.SERVE_MARKETING_PAGE === 'true' || 
                                host.includes('yourturnai.com');
    
    console.log(`Root request - Host: ${host}, ServeMarketingPage: ${serveMarketingPage}`);
    
    if (serveMarketingPage) {
        // Serve marketing page for yourturnai.com domain
        res.sendFile(path.join(__dirname, 'marketingpage', 'index.html'));
    } else {
        // Serve regular public index for other cases
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

// Static file middleware - after route handlers
app.use(express.static('public'));
app.use('/marketingpage', express.static('marketingpage'));

// ========== API ROUTES ==========

// Get menu
app.get('/api/menu', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .eq('activo', true)
            .order('categoria', { ascending: true })
            .order('nombre', { ascending: true });

        if (error) {
            console.error('Error getting menu:', error);
            return res.status(500).json({ error: 'Error getting menu' });
        }

        res.json(data || []);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get modifiers for a category
app.get('/api/modifiers/:category', async (req, res) => {
    try {
        const { category } = req.params;

        const { data, error } = await supabase
            .from('menu_modifiers')
            .select('*')
            .contains('applies_to_categories', [category])
            .order('modifier_group', { ascending: true })
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error getting modifiers:', error);
            return res.status(500).json({ error: 'Error getting modifiers' });
        }

        // Group modifiers by group
        const grouped = {};
        if (data) {
            data.forEach(mod => {
                if (!grouped[mod.modifier_group]) {
                    grouped[mod.modifier_group] = {
                        group: mod.modifier_group,
                        is_multiple: mod.is_multiple,
                        is_required: mod.is_required,
                        options: []
                    };
                }
                grouped[mod.modifier_group].options.push({
                    id: mod.id,
                    name: mod.modifier_name,
                    price: parseFloat(mod.price_modifier),
                    is_multiple: mod.is_multiple
                });
            });
        }

        res.json(Object.values(grouped));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create order
app.post('/api/pedidos', async (req, res) => {
    try {
        const { mesa_id, items, total, notas } = req.body;

        if (!mesa_id || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Incomplete data' });
        }

        // Create the order
        const { data: pedido, error: pedidoError } = await supabase
            .from('pedidos')
            .insert({
                mesa_id,
                items: items,
                total: total || 0,
                notas: notas || '',
                estado: 'pendiente',
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (pedidoError) {
            console.error('Error creating order:', pedidoError);
            return res.status(500).json({ error: 'Error creating order' });
        }

        res.status(201).json({
            message: 'Order created successfully',
            pedido
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all orders (for admin)
app.get('/api/pedidos', async (req, res) => {
    try {
        const { estado } = req.query;

        let query = supabase
            .from('pedidos')
            .select('*')
            .order('created_at', { ascending: false });

        if (estado) {
            query = query.eq('estado', estado);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error getting orders:', error);
            return res.status(500).json({ error: 'Error getting orders' });
        }

        res.json(data || []);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update order status
app.patch('/api/pedidos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        if (!estado || !['pendiente', 'preparando', 'listo', 'entregado', 'cancelado'].includes(estado)) {
            return res.status(400).json({ error: 'Invalid status' });
    }

        const { data, error } = await supabase
            .from('pedidos')
            .update({ estado })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating order:', error);
            return res.status(500).json({ error: 'Error updating order' });
        }

        res.json({
            message: 'Order updated',
            pedido: data
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get orders from a specific table
app.get('/api/mesa/:mesa_id/pedidos', async (req, res) => {
    try {
        const { mesa_id } = req.params;

        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .eq('mesa_id', mesa_id)
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) {
            console.error('Error getting table orders:', error);
            return res.status(500).json({ error: 'Error getting orders' });
        }

        res.json(data || []);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ========== STRIPE PAYMENT ROUTES ==========

// Get Stripe publishable key (safe to expose to client)
app.get('/api/stripe-config', (req, res) => {
    res.json({ publishableKey: STRIPE_PUBLISHABLE_KEY });
});

// Create payment intent
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, mesa_id, order_id } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Convert amount to cents (Stripe uses cents)
        const amountInCents = Math.round(amount * 100);

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'aud', // Australian Dollars
            metadata: {
                mesa_id: mesa_id || 'unknown',
                order_id: order_id || 'unknown'
            },
            payment_method_types: ['card'],
            // Enable Apple Pay and Google Pay
            payment_method_options: {
                card: {
                    request_three_d_secure: 'automatic'
                }
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message || 'Error creating payment intent' });
    }
});

// Confirm payment and create order
app.post('/api/confirm-payment-order', async (req, res) => {
    try {
        const { paymentIntentId, mesa_id, items, total, notas } = req.body;

        if (!paymentIntentId || !mesa_id || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Incomplete data' });
        }

        // Verify payment intent
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ error: 'Payment not completed' });
        }

        // Create the order
        const { data: pedido, error: pedidoError } = await supabase
            .from('pedidos')
            .insert({
                mesa_id,
                items: items,
                total: total || 0,
                notas: notas || '',
                estado: 'pendiente',
                payment_intent_id: paymentIntentId,
                payment_status: 'paid',
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (pedidoError) {
            console.error('Error creating order:', pedidoError);
            return res.status(500).json({ error: 'Error creating order' });
        }

        res.status(201).json({
            message: 'Order created successfully',
            pedido
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Catch-all route to serve frontend (SPA)
app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' });
    }
    if (req.path.startsWith('/marketingpage')) {
        return res.sendFile(path.join(__dirname, 'marketingpage', 'index.html'));
    }
    // For SPA routes, serve public/index.html
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    if (SUPABASE_URL) {
        console.log(`✅ Supabase configured: ${SUPABASE_URL}`);
    } else {
        console.log(`⚠️  Supabase not configured. Set SUPABASE_URL and SUPABASE_KEY`);
    }
    if (STRIPE_SECRET_KEY && STRIPE_PUBLISHABLE_KEY) {
        console.log(`✅ Stripe configured: ${STRIPE_PUBLISHABLE_KEY.substring(0, 20)}...`);
    } else {
        console.log(`⚠️  Stripe not configured. Set STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY`);
    }
    if (process.env.NODE_ENV === 'production') {
        console.log(`🌐 Application deployed in production`);
    } else {
        console.log(`🔗 Access from: http://localhost:${PORT}`);
        console.log(`   - Client (table): http://localhost:${PORT}/mesa?mesa=1`);
        console.log(`   - Admin: http://localhost:${PORT}/admin`);
    }
});
