-- ============================================
-- Esquema de Base de Datos para Sistema de Pedidos
-- ============================================

-- Tabla de items del menú
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    mesa_id VARCHAR(50) NOT NULL,
    items JSONB NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    notas TEXT,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'preparando', 'listo', 'entregado', 'cancelado')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_mesa ON pedidos(mesa_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_created ON pedidos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_menu_activo ON menu_items(activo);
CREATE INDEX IF NOT EXISTS idx_menu_categoria ON menu_items(categoria);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pedidos_updated_at BEFORE UPDATE ON pedidos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample menu data
INSERT INTO menu_items (nombre, descripcion, precio, categoria) VALUES
('Classic Burger', 'Beef, lettuce, tomato, onion, cheese and special sauces', 12.99, 'Main Dishes'),
('BBQ Burger', 'Beef, bacon, cheddar cheese, caramelized onion and BBQ sauce', 14.99, 'Main Dishes'),
('Margherita Pizza', 'Fresh mozzarella cheese, tomato and basil', 15.99, 'Main Dishes'),
('Pepperoni Pizza', 'Mozzarella cheese and pepperoni', 16.99, 'Main Dishes'),
('Carbonara Pasta', 'Fettuccine with bacon, cream and parmesan cheese', 13.99, 'Main Dishes'),
('Caesar Salad', 'Romaine lettuce, grilled chicken, croutons and caesar dressing', 10.99, 'Salads'),
('Mediterranean Salad', 'Lettuce, tomato, olives, feta cheese and lemon dressing', 9.99, 'Salads'),
('Coca Cola', 'Soft drink 500ml', 2.99, 'Drinks'),
('Sprite', 'Soft drink 500ml', 2.99, 'Drinks'),
('Mineral Water', 'Natural water 500ml', 1.99, 'Drinks'),
('Orange Juice', 'Natural orange juice 300ml', 3.99, 'Drinks'),
('Chocolate Cake', 'Chocolate dessert with whipped cream', 6.99, 'Desserts'),
('Vanilla Flan', 'Homemade flan with caramel', 5.99, 'Desserts'),
('Ice Cream', 'Ice cream in vanilla, chocolate or strawberry', 4.99, 'Desserts')
ON CONFLICT DO NOTHING;

-- Comentarios en las tablas
COMMENT ON TABLE menu_items IS 'Items disponibles en el menú del restaurante';
COMMENT ON TABLE pedidos IS 'Pedidos realizados por los clientes desde las mesas';
COMMENT ON COLUMN pedidos.items IS 'Array JSON con los items del pedido: [{"id": 1, "nombre": "...", "precio": 12.99, "cantidad": 2}]';
COMMENT ON COLUMN pedidos.estado IS 'Estado del pedido: pendiente, preparando, listo, entregado, cancelado';

