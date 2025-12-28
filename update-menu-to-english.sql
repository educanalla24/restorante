-- ============================================
-- Update Menu Items from Spanish to English
-- ============================================

-- Update Main Dishes (Platos Principales)
UPDATE menu_items 
SET nombre = 'Classic Burger',
    descripcion = 'Beef, lettuce, tomato, onion, cheese and special sauces',
    categoria = 'Main Dishes'
WHERE nombre = 'Hamburguesa Clásica';

UPDATE menu_items 
SET nombre = 'BBQ Burger',
    descripcion = 'Beef, bacon, cheddar cheese, caramelized onion and BBQ sauce',
    categoria = 'Main Dishes'
WHERE nombre = 'Hamburguesa BBQ';

UPDATE menu_items 
SET nombre = 'Margherita Pizza',
    descripcion = 'Fresh mozzarella cheese, tomato and basil',
    categoria = 'Main Dishes'
WHERE nombre = 'Pizza Margarita';

UPDATE menu_items 
SET nombre = 'Pepperoni Pizza',
    descripcion = 'Mozzarella cheese and pepperoni',
    categoria = 'Main Dishes'
WHERE nombre = 'Pizza Pepperoni';

UPDATE menu_items 
SET nombre = 'Carbonara Pasta',
    descripcion = 'Fettuccine with bacon, cream and parmesan cheese',
    categoria = 'Main Dishes'
WHERE nombre = 'Pasta Carbonara';

-- Update Salads (Ensaladas)
UPDATE menu_items 
SET nombre = 'Caesar Salad',
    descripcion = 'Romaine lettuce, grilled chicken, croutons and caesar dressing',
    categoria = 'Salads'
WHERE nombre = 'Ensalada César';

UPDATE menu_items 
SET nombre = 'Mediterranean Salad',
    descripcion = 'Lettuce, tomato, olives, feta cheese and lemon dressing',
    categoria = 'Salads'
WHERE nombre = 'Ensalada Mediterránea';

-- Update Drinks (Bebidas)
UPDATE menu_items 
SET nombre = 'Coca Cola',
    descripcion = 'Soft drink 500ml',
    categoria = 'Drinks'
WHERE nombre = 'Coca Cola';

UPDATE menu_items 
SET nombre = 'Sprite',
    descripcion = 'Soft drink 500ml',
    categoria = 'Drinks'
WHERE nombre = 'Sprite';

UPDATE menu_items 
SET nombre = 'Mineral Water',
    descripcion = 'Natural water 500ml',
    categoria = 'Drinks'
WHERE nombre = 'Agua Mineral';

UPDATE menu_items 
SET nombre = 'Orange Juice',
    descripcion = 'Natural orange juice 300ml',
    categoria = 'Drinks'
WHERE nombre = 'Jugo de Naranja';

-- Update Desserts (Postres)
UPDATE menu_items 
SET nombre = 'Chocolate Cake',
    descripcion = 'Chocolate dessert with whipped cream',
    categoria = 'Desserts'
WHERE nombre = 'Tarta de Chocolate';

UPDATE menu_items 
SET nombre = 'Vanilla Flan',
    descripcion = 'Homemade flan with caramel',
    categoria = 'Desserts'
WHERE nombre = 'Flan de Vainilla';

UPDATE menu_items 
SET nombre = 'Ice Cream',
    descripcion = 'Ice cream in vanilla, chocolate or strawberry',
    categoria = 'Desserts'
WHERE nombre = 'Helado';

-- Verify updates
SELECT id, nombre, descripcion, categoria 
FROM menu_items 
ORDER BY categoria, nombre;

