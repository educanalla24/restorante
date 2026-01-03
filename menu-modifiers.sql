-- ============================================
-- Menu Modifiers/Options System
-- Similar to Marini Cafe customization options
-- ============================================

-- Table for product modifiers
CREATE TABLE IF NOT EXISTS menu_modifiers (
    id SERIAL PRIMARY KEY,
    modifier_group VARCHAR(100) NOT NULL,
    modifier_name VARCHAR(255) NOT NULL,
    price_modifier DECIMAL(10, 2) DEFAULT 0.00,
    is_multiple BOOLEAN DEFAULT false,
    is_required BOOLEAN DEFAULT false,
    applies_to_categories TEXT[], -- Array of categories this modifier applies to
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert Milk Options (applies to Coffee/Tea and Iced Drinks)
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Milk Options', 'Full Cream', 0.00, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 1),
('Milk Options', 'Skim Milk', 0.00, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 2),
('Milk Options', 'Almond Milk', 0.50, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 3),
('Milk Options', 'Oat Milk', 0.50, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 4),
('Milk Options', 'Soy Milk', 0.50, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 5),
('Milk Options', 'Lactose Free', 0.50, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 6),
('Milk Options', 'NO Milk', 0.00, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 7),

-- Sugar Options (applies to Coffee/Tea and Iced Drinks)
('Sugar Options', 'Sugar', 0.00, true, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 1),
('Sugar Options', '1/2 Sugar', 0.00, true, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 2),
('Sugar Options', '1/4 Sugar', 0.00, true, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 3),
('Sugar Options', 'Equal', 0.00, true, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 4),
('Sugar Options', 'NO Sugar', 0.00, true, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 5),

-- Hot Beverage Modifications (applies to Coffee/Tea)
('Hot Bev Mods', 'Weak', 0.00, true, false, ARRAY['Coffee/Tea'], 1),
('Hot Bev Mods', 'Extra Shot (Strong)', 1.00, true, false, ARRAY['Coffee/Tea'], 2),
('Hot Bev Mods', 'Very Hot', 0.00, true, false, ARRAY['Coffee/Tea'], 3),
('Hot Bev Mods', 'Warm', 0.00, true, false, ARRAY['Coffee/Tea'], 4),
('Hot Bev Mods', 'Decaf', 0.50, true, false, ARRAY['Coffee/Tea'], 5);

-- Verify inserts
SELECT modifier_group, COUNT(*) as total_options, 
       SUM(CASE WHEN price_modifier > 0 THEN 1 ELSE 0 END) as paid_options
FROM menu_modifiers
GROUP BY modifier_group
ORDER BY modifier_group;

