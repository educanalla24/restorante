-- ============================================
-- Consolidate Menu Items: Remove Size Variants
-- Keep only one product per name (using Small price as base)
-- ============================================

-- Step 1: For products with size variants, delete all variants and insert consolidated version
-- Products that had Small/Large/X-Large variants in Coffee/Tea category

-- Cappuccino: Small 5.50, Large 6.50, X-Large 6.50 -> consolidate to 5.50
DELETE FROM menu_items WHERE nombre = 'Cappuccino' AND categoria = 'Coffee/Tea';
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) 
VALUES ('Cappuccino', '', 5.50, 'Coffee/Tea', true);

-- Flat White: Small 5.00, Large 5.50, X-Large 6.50 -> consolidate to 5.00
DELETE FROM menu_items WHERE nombre = 'Flat White' AND categoria = 'Coffee/Tea';
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) 
VALUES ('Flat White', '', 5.00, 'Coffee/Tea', true);

-- Cafe Latte: Small 5.00, Large 5.50, X-Large 6.50 -> consolidate to 5.00
DELETE FROM menu_items WHERE nombre = 'Cafe Latte' AND categoria = 'Coffee/Tea';
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) 
VALUES ('Cafe Latte', '', 5.00, 'Coffee/Tea', true);

-- Mocha: Small 5.50, Large 6.00, X-Large 7.00 -> consolidate to 5.50
DELETE FROM menu_items WHERE nombre = 'Mocha' AND categoria = 'Coffee/Tea';
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) 
VALUES ('Mocha', '', 5.50, 'Coffee/Tea', true);

-- Chai Latte: Small 5.50, Large 6.00, X-Large 7.00 -> consolidate to 5.50
DELETE FROM menu_items WHERE nombre = 'Chai Latte' AND categoria = 'Coffee/Tea';
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) 
VALUES ('Chai Latte', '', 5.50, 'Coffee/Tea', true);

-- Long Black: Small 5.00, Large 5.50, X-Large 6.50 -> consolidate to 5.00
DELETE FROM menu_items WHERE nombre = 'Long Black' AND categoria = 'Coffee/Tea';
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) 
VALUES ('Long Black', '', 5.00, 'Coffee/Tea', true);

-- Hot Chocolate: Small 5.00, Large 5.50, X-Large 6.50 -> consolidate to 5.00
DELETE FROM menu_items WHERE nombre = 'Hot Chocolate' AND categoria = 'Coffee/Tea';
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) 
VALUES ('Hot Chocolate', '', 5.00, 'Coffee/Tea', true);

-- Handle Sparkling Water (Small and Large are separate products)
-- Delete "Small Sparkling Water" and "Large Sparkling Water", create "Sparkling Water" with Small price
DELETE FROM menu_items WHERE nombre IN ('Small Sparkling Water', 'Large Sparkling Water');
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) 
VALUES ('Sparkling Water', '', 4.00, 'Cold Bevs', true);

-- Handle Chips (Small and Large are separate products)
-- Delete "Small Bowl Chips" and "Large Bowl Chips" from Burgers category, create "Bowl Chips" with Small price
DELETE FROM menu_items WHERE nombre IN ('Small Bowl Chips', 'Large Bowl Chips') AND categoria = 'Burgers | Sandwiches | Wraps';
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) 
VALUES ('Bowl Chips', '', 8.00, 'Burgers | Sandwiches | Wraps', true);

-- Delete "Small Bowl Chips" and "Large Bowl Chips" from Little Nippers category, create "Bowl Chips" with Small price
DELETE FROM menu_items WHERE nombre IN ('Small Bowl Chips', 'Large Bowl Chips') AND categoria = 'Little Nippers';
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) 
VALUES ('Bowl Chips', '', 8.00, 'Little Nippers', true);

-- Verify changes
SELECT nombre, descripcion, precio, categoria 
FROM menu_items 
WHERE nombre IN ('Cappuccino', 'Flat White', 'Cafe Latte', 'Mocha', 'Chai Latte', 'Long Black', 'Hot Chocolate', 'Sparkling Water', 'Bowl Chips')
ORDER BY categoria, nombre;

