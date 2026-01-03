-- ============================================
-- Complete Menu Modifiers System for Marini Cafe
-- All customization options for all categories
-- ============================================

-- Clear existing modifiers (optional)
-- DELETE FROM menu_modifiers;

-- ============================================
-- SIZE OPTIONS (Coffee/Tea, Iced Drinks, Cold Bevs, Chips)
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Size', 'Small', 0.00, false, false, ARRAY['Coffee/Tea', 'Iced Drinks', 'Cold Bevs', 'Burgers | Sandwiches | Wraps', 'Little Nippers'], 1),
('Size', 'Large', 0.50, false, false, ARRAY['Coffee/Tea', 'Iced Drinks', 'Cold Bevs', 'Burgers | Sandwiches | Wraps', 'Little Nippers'], 2),
('Size', 'X-Large', 1.50, false, false, ARRAY['Coffee/Tea', 'Iced Drinks', 'Cold Bevs', 'Burgers | Sandwiches | Wraps', 'Little Nippers'], 3);

-- ============================================
-- MILK OPTIONS (Coffee/Tea, Iced Drinks, Hot Chocolate)
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Milk Options', 'Full Cream', 0.00, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 1),
('Milk Options', 'Skim Milk', 0.00, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 2),
('Milk Options', 'Almond Milk', 0.50, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 3),
('Milk Options', 'Oat Milk', 0.50, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 4),
('Milk Options', 'Soy Milk', 0.50, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 5),
('Milk Options', 'Lactose Free', 0.50, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 6),
('Milk Options', 'NO Milk', 0.00, false, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 7);

-- ============================================
-- SUGAR OPTIONS (Coffee/Tea, Iced Drinks)
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Sugar Options', 'Sugar', 0.00, true, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 1),
('Sugar Options', '1/2 Sugar', 0.00, true, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 2),
('Sugar Options', '1/4 Sugar', 0.00, true, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 3),
('Sugar Options', 'Equal', 0.00, true, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 4),
('Sugar Options', 'NO Sugar', 0.00, true, false, ARRAY['Coffee/Tea', 'Iced Drinks'], 5);

-- ============================================
-- HOT BEVERAGE MODIFICATIONS (Coffee/Tea)
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Hot Bev Mods', 'Weak', 0.00, true, false, ARRAY['Coffee/Tea'], 1),
('Hot Bev Mods', 'Extra Shot (Strong)', 1.00, true, false, ARRAY['Coffee/Tea'], 2),
('Hot Bev Mods', 'Very Hot', 0.00, true, false, ARRAY['Coffee/Tea'], 3),
('Hot Bev Mods', 'Warm', 0.00, true, false, ARRAY['Coffee/Tea'], 4),
('Hot Bev Mods', 'Decaf', 0.50, true, false, ARRAY['Coffee/Tea'], 5);

-- ============================================
-- SALAD DRESSING OPTIONS (Salads)
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Dressing Options', 'Caesar Dressing', 0.00, false, false, ARRAY['Salads'], 1),
('Dressing Options', 'Balsamic Vinegar', 0.00, false, false, ARRAY['Salads'], 2),
('Dressing Options', 'Aioli Dressing', 0.00, false, false, ARRAY['Salads'], 3),
('Dressing Options', 'Lemon Dressing', 0.00, false, false, ARRAY['Salads'], 4),
('Dressing Options', 'No Dressing', 0.00, false, false, ARRAY['Salads'], 5),
('Dressing Options', 'Dressing on the Side', 0.00, false, false, ARRAY['Salads'], 6);

-- ============================================
-- SALAD PROTEIN OPTIONS (Salads)
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Protein Options', 'Grilled Chicken', 5.00, false, false, ARRAY['Salads'], 1),
('Protein Options', 'Smoked Salmon', 6.00, false, false, ARRAY['Salads'], 2),
('Protein Options', 'Tuna', 4.00, false, false, ARRAY['Salads'], 3),
('Protein Options', 'Halloumi', 5.00, false, false, ARRAY['Salads'], 4),
('Protein Options', 'No Protein', 0.00, false, false, ARRAY['Salads'], 5);

-- ============================================
-- BURGER/SANDWICH OPTIONS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Burger Mods', 'No Onion', 0.00, true, false, ARRAY['Burgers | Sandwiches | Wraps'], 1),
('Burger Mods', 'No Tomato', 0.00, true, false, ARRAY['Burgers | Sandwiches | Wraps'], 2),
('Burger Mods', 'No Lettuce', 0.00, true, false, ARRAY['Burgers | Sandwiches | Wraps'], 3),
('Burger Mods', 'No Beetroot', 0.00, true, false, ARRAY['Burgers | Sandwiches | Wraps'], 4),
('Burger Mods', 'Extra Cheese', 1.50, true, false, ARRAY['Burgers | Sandwiches | Wraps'], 5),
('Burger Mods', 'Extra Bacon', 3.00, true, false, ARRAY['Burgers | Sandwiches | Wraps'], 6),
('Burger Mods', 'Extra Egg', 2.00, true, false, ARRAY['Burgers | Sandwiches | Wraps'], 7),
('Burger Mods', 'Add Chips', 3.00, true, false, ARRAY['Burgers | Sandwiches | Wraps'], 8),
('Burger Mods', 'Add Salad', 3.00, true, false, ARRAY['Burgers | Sandwiches | Wraps'], 9);

-- ============================================
-- BREAKFAST EGG OPTIONS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Egg Options', 'Scrambled', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 1),
('Egg Options', 'Fried', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 2),
('Egg Options', 'Poached', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 3),
('Egg Options', 'Boiled', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 4),
('Egg Options', 'Egg Whites Only', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 5);

-- ============================================
-- BREAKFAST BREAD OPTIONS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Bread Options', 'White Bread', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 1),
('Bread Options', 'Brown Bread', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 2),
('Bread Options', 'Sourdough', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 3),
('Bread Options', 'Rye Sourdough', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 4),
('Bread Options', 'Turkish Bread', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 5),
('Bread Options', 'Soy Linseed Bread', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 6),
('Bread Options', 'Gluten Free Bread', 0.00, false, false, ARRAY['Breakfast', 'Marini''s Specials'], 7);

-- ============================================
-- BREAKFAST EXTRAS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Breakfast Extras', 'Extra Bacon', 4.00, true, false, ARRAY['Breakfast', 'Marini''s Specials'], 1),
('Breakfast Extras', 'Extra Hash Brown', 2.00, true, false, ARRAY['Breakfast', 'Marini''s Specials'], 2),
('Breakfast Extras', 'Extra Tomato', 1.00, true, false, ARRAY['Breakfast', 'Marini''s Specials'], 3),
('Breakfast Extras', 'Extra Mushroom', 2.00, true, false, ARRAY['Breakfast', 'Marini''s Specials'], 4),
('Breakfast Extras', 'Extra Avocado', 3.00, true, false, ARRAY['Breakfast', 'Marini''s Specials'], 5),
('Breakfast Extras', 'Extra Halloumi', 4.00, true, false, ARRAY['Breakfast', 'Marini''s Specials'], 6);

-- ============================================
-- OMELETTE OPTIONS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Omelette Fillings', 'Ham', 0.00, true, false, ARRAY['Omelette'], 1),
('Omelette Fillings', 'Cheese', 0.00, true, false, ARRAY['Omelette'], 2),
('Omelette Fillings', 'Tomato', 0.00, true, false, ARRAY['Omelette'], 3),
('Omelette Fillings', 'Mushroom', 0.00, true, false, ARRAY['Omelette'], 4),
('Omelette Fillings', 'Spinach', 0.00, true, false, ARRAY['Omelette'], 5),
('Omelette Fillings', 'Onion', 0.00, true, false, ARRAY['Omelette'], 6),
('Omelette Fillings', 'Bacon', 2.00, true, false, ARRAY['Omelette'], 7),
('Omelette Fillings', 'Smoked Salmon', 4.00, true, false, ARRAY['Omelette'], 8),
('Omelette Fillings', 'Goat''s Cheese', 2.00, true, false, ARRAY['Omelette'], 9);

-- ============================================
-- SEAFOOD OPTIONS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Seafood Options', 'Lemon Wedge', 0.00, true, false, ARRAY['Just Seafood'], 1),
('Seafood Options', 'Tartar Sauce', 0.00, true, false, ARRAY['Just Seafood'], 2),
('Seafood Options', 'Aioli', 0.00, true, false, ARRAY['Just Seafood'], 3),
('Seafood Options', 'Extra Chips', 3.00, true, false, ARRAY['Just Seafood'], 4),
('Seafood Options', 'Extra Salad', 3.00, true, false, ARRAY['Just Seafood'], 5);

-- ============================================
-- PANCAKES/FRENCH TOAST OPTIONS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Pancake Toppings', 'Mixed Berries', 0.00, true, false, ARRAY['Breakfast'], 1),
('Pancake Toppings', 'Banana', 0.00, true, false, ARRAY['Breakfast'], 2),
('Pancake Toppings', 'Ice Cream', 2.00, true, false, ARRAY['Breakfast'], 3),
('Pancake Toppings', 'Lemon', 0.00, true, false, ARRAY['Breakfast'], 4),
('Pancake Toppings', 'Cream', 1.50, true, false, ARRAY['Breakfast'], 5),
('Pancake Toppings', 'Chocolate', 1.50, true, false, ARRAY['Breakfast'], 6),
('Pancake Toppings', 'Maple Syrup', 0.00, true, false, ARRAY['Breakfast'], 7);

-- ============================================
-- PORRIDGE OPTIONS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Porridge Milk', 'Regular Milk', 0.00, false, false, ARRAY['Breakfast'], 1),
('Porridge Milk', 'Soy Milk', 1.00, false, false, ARRAY['Breakfast'], 2),
('Porridge Milk', 'Almond Milk', 1.00, false, false, ARRAY['Breakfast'], 3),
('Porridge Milk', 'Macadamia Milk', 1.00, false, false, ARRAY['Breakfast'], 4),
('Porridge Milk', 'Lactose Free Milk', 1.00, false, false, ARRAY['Breakfast'], 5);

-- ============================================
-- PORRIDGE TOPPINGS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Porridge Toppings', 'Honey & Berry Compote', 0.00, true, false, ARRAY['Breakfast'], 1),
('Porridge Toppings', 'Banana', 0.00, true, false, ARRAY['Breakfast'], 2);

-- ============================================
-- ICED DRINKS OPTIONS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Iced Drink Options', 'Extra Shot', 1.00, true, false, ARRAY['Iced Drinks'], 1),
('Iced Drink Options', 'No Ice', 0.00, true, false, ARRAY['Iced Drinks'], 2),
('Iced Drink Options', 'Light Ice', 0.00, true, false, ARRAY['Iced Drinks'], 3);

-- ============================================
-- SMOOTHIE OPTIONS
-- ============================================
INSERT INTO menu_modifiers (modifier_group, modifier_name, price_modifier, is_multiple, is_required, applies_to_categories, display_order) VALUES
('Smoothie Options', 'Add Protein', 3.00, true, false, ARRAY['Iced Drinks'], 1),
('Smoothie Options', 'Add Chia Seeds', 1.00, true, false, ARRAY['Iced Drinks'], 2),
('Smoothie Options', 'Add Flax Seeds', 1.00, true, false, ARRAY['Iced Drinks'], 3);

-- ============================================
-- VERIFY ALL MODIFIERS
-- ============================================
SELECT modifier_group, COUNT(*) as total_options, 
       SUM(CASE WHEN price_modifier > 0 THEN 1 ELSE 0 END) as paid_options
FROM menu_modifiers
GROUP BY modifier_group
ORDER BY modifier_group;

-- View modifiers with their categories (separate query)
SELECT modifier_group, modifier_name, price_modifier, 
       array_to_string(applies_to_categories, ', ') as categories
FROM menu_modifiers
ORDER BY modifier_group, display_order;

