-- ============================================
-- Marini Cafe Complete Menu Database
-- Based on https://order.marini-cafe.com.au/
-- ============================================

-- Clear existing menu items (optional - comment out if you want to keep existing items)
 DELETE FROM menu_items;

-- Coffee/Tea Category
INSERT INTO menu_items (nombre, descripcion, precio, categoria, activo) VALUES
('Espresso', '', 4.50, 'Coffee/Tea', true),
('Double Espresso', '', 5.00, 'Coffee/Tea', true),
('Cappuccino', 'Small', 5.50, 'Coffee/Tea', true),
('Cappuccino', 'Large', 6.50, 'Coffee/Tea', true),
('Cappuccino', 'X-Large', 6.50, 'Coffee/Tea', true),
('Flat White', 'Small', 5.00, 'Coffee/Tea', true),
('Flat White', 'Large', 5.50, 'Coffee/Tea', true),
('Flat White', 'X-Large', 6.50, 'Coffee/Tea', true),
('Cafe Latte', 'Small', 5.00, 'Coffee/Tea', true),
('Cafe Latte', 'Large', 5.50, 'Coffee/Tea', true),
('Cafe Latte', 'X-Large', 6.50, 'Coffee/Tea', true),
('Mocha', 'Small', 5.50, 'Coffee/Tea', true),
('Mocha', 'Large', 6.00, 'Coffee/Tea', true),
('Mocha', 'X-Large', 7.00, 'Coffee/Tea', true),
('Chai Latte', 'Small', 5.50, 'Coffee/Tea', true),
('Chai Latte', 'Large', 6.00, 'Coffee/Tea', true),
('Chai Latte', 'X-Large', 7.00, 'Coffee/Tea', true),
('Long Black', 'Small', 5.00, 'Coffee/Tea', true),
('Long Black', 'Large', 5.50, 'Coffee/Tea', true),
('Long Black', 'X-Large', 6.50, 'Coffee/Tea', true),
('Macchiato', '', 5.00, 'Coffee/Tea', true),
('Long Macchiato', '', 5.50, 'Coffee/Tea', true),
('Piccolo Latte', '', 5.00, 'Coffee/Tea', true),
('Hot Chocolate', 'Small', 5.00, 'Coffee/Tea', true),
('Hot Chocolate', 'Large', 5.50, 'Coffee/Tea', true),
('Hot Chocolate', 'X-Large', 6.50, 'Coffee/Tea', true),
('Affogato', '', 6.00, 'Coffee/Tea', true),
('English Breakfast', '', 5.00, 'Coffee/Tea', true),
('Earl Grey', '', 5.00, 'Coffee/Tea', true),
('Chamomile', '', 5.00, 'Coffee/Tea', true),
('Chai Tea', '', 5.00, 'Coffee/Tea', true),
('Green Tea', '', 5.00, 'Coffee/Tea', true),
('Irish Tea', '', 5.00, 'Coffee/Tea', true),
('Lemon Ginger Tea', '', 5.00, 'Coffee/Tea', true),
('Peppermint', '', 5.00, 'Coffee/Tea', true),
('Brewed Chai Tea', '', 6.50, 'Coffee/Tea', true),
('Babycino', '', 2.00, 'Coffee/Tea', true),

-- Cold Bevs Category
('Small Sparkling Water', '', 4.00, 'Cold Bevs', true),
('Large Sparkling Water', '', 5.00, 'Cold Bevs', true),
('Bottle Juice', '', 5.00, 'Cold Bevs', true),
('Coke', '', 3.50, 'Cold Bevs', true),
('Coke Zero', '', 3.50, 'Cold Bevs', true),
('Diet Coke', '', 3.50, 'Cold Bevs', true),
('Sprite', '', 3.50, 'Cold Bevs', true),
('Fanta', '', 3.50, 'Cold Bevs', true),
('Powerade', '', 5.00, 'Cold Bevs', true),

-- Iced Drinks Category
('Iced Latte', '', 8.00, 'Iced Drinks', true),
('Iced Long Black', '', 7.00, 'Iced Drinks', true),
('Iced Matcha', '', 10.00, 'Iced Drinks', true),
('Iced Coffee', '', 10.00, 'Iced Drinks', true),
('Iced Choc', '', 11.00, 'Iced Drinks', true),
('Iced Mocha', '', 12.00, 'Iced Drinks', true),
('Coffee Frappe', '', 12.00, 'Iced Drinks', true),
('Mocha Frappe', '', 12.00, 'Iced Drinks', true),
('Iced Chai Latte', '', 10.00, 'Iced Drinks', true),
('Frappe', '', 11.00, 'Iced Drinks', true),
('Fresh Juice', '', 11.00, 'Iced Drinks', true),
('Milkshakes', '', 11.00, 'Iced Drinks', true),
('Thickshake', '', 12.00, 'Iced Drinks', true),
('Acai Smoothie', 'Blended with banana', 12.00, 'Iced Drinks', true),
('Smoothies', '', 11.00, 'Iced Drinks', true),
('Affogato', '', 5.50, 'Iced Drinks', true),

-- Display Category
('Banana Bread', '', 5.00, 'Display', true),
('Muffins', '', 5.00, 'Display', true),
('Choc Croissant', '', 7.00, 'Display', true),
('Almond Croissant', '', 7.00, 'Display', true),
('Plain Croissant', '', 5.00, 'Display', true),
('Caramel Slice', '', 6.00, 'Display', true),
('Fignut Slice', '', 7.00, 'Display', true),
('Brownie', '', 6.00, 'Display', true),
('Cheesecake', '', 8.00, 'Display', true),
('Passionfruit Slice', '', 6.00, 'Display', true),
('Muesli Cookie', '', 6.00, 'Display', true),
('Vegan Muesli Cookie', '', 6.50, 'Display', true),
('GF Coffee Cookie', '', 4.50, 'Display', true),
('Smartie Cookie', '', 4.50, 'Display', true),
('GF Choc Chip Cookie', '', 6.00, 'Display', true),
('Orange Cake', '', 6.00, 'Display', true),
('Ginger Bread', '', 4.00, 'Display', true),
('Protein Balls', '', 4.00, 'Display', true),
('Lemon Tart', '', 5.50, 'Display', true),
('Vegan Paleo', '', 6.00, 'Display', true),
('Honey Cake', '', 8.50, 'Display', true),
('Carrot Cake', '', 6.00, 'Display', true),
('Filo', '', 10.00, 'Display', true),

-- Acai Bowl Category
('Acai Bowl', 'Topped with granola, banana, strawberry, coconut flakes & honey', 16.00, 'Acai Bowl', true),

-- Breakfast Category
('Eggs & Toast', '', 14.00, 'Breakfast', true),
('Eggs, Toast & Bacon', '', 17.00, 'Breakfast', true),
('Marini Breakfast', 'Eggs, bacon, chipolata, roasted tomato, hash brown & toast', 22.00, 'Breakfast', true),
('Veggie Breakfast', 'Eggs, spinach, hash brown, mushroom, tomato & toast', 22.00, 'Breakfast', true),
('Big Breakfast', 'Eggs, bacon, roasted tomato, hash brown, chipolata, mushroom, baked beans and toast', 25.00, 'Breakfast', true),
('Corn Fritters', 'Served with spinach, tomato and your choice of protein', 20.00, 'Breakfast', true),
('Vanilla French Toast', 'With your 3 choices of mixed berries, banana, ice cream, & maple syrup', 19.00, 'Breakfast', true),
('Traditional Muesli', 'With berry compote, banana, yoghurt & honey', 14.00, 'Breakfast', true),
('Eggs Benedict', 'Poached Eggs on english muffin with spinach, hollandaise sauce, and a choice of protein', 20.00, 'Breakfast', true),
('Tomato & Avocado Turkish', 'With balsamic vinegar', 17.00, 'Breakfast', true),
('Porridge', 'Made with milk and topped with honey & berry compote or banana with soy milk, almond milk, maccadamia milk, lactose free milk (extra $1)', 14.00, 'Breakfast', true),
('Fruit Salad', 'With seasonal fruits on top with yoghurt & honey', 14.00, 'Breakfast', true),
('Pancakes', 'With your choice of 2: berry compote, banana, ice cream, lemon, cream, chocolate, maple syrup', 19.00, 'Breakfast', true),

-- Bread Category
('White Bread', '', 8.00, 'Bread', true),
('Brown Bread', '', 8.00, 'Bread', true),
('Sourdough Bread', '', 8.00, 'Bread', true),
('Rye Sourdough Bread', '', 8.00, 'Bread', true),
('Raisin Bread', '', 8.00, 'Bread', true),
('Turkish Bread', '', 8.00, 'Bread', true),
('Soy Lin Seed Bread', '', 8.00, 'Bread', true),
('Gluten Free Bread', '', 8.00, 'Bread', true),

-- Quick Bite Category
('Grilled Cheese S/W', '', 8.00, 'Quick Bite', true),
('Cheese/Tomato S/W', '', 11.00, 'Quick Bite', true),
('Ham / Cheese / Tomato S/W', '', 12.00, 'Quick Bite', true),
('Bacon & Egg Roll', '', 12.00, 'Quick Bite', true),
('Bacon & Egg Wrap', '', 12.00, 'Quick Bite', true),
('Ham / Cheese Croissant', '', 10.00, 'Quick Bite', true),
('Bacon & Egg S/W', '', 12.00, 'Quick Bite', true),
('Salad / Cheese / Avo S/W', '', 13.00, 'Quick Bite', true),

-- Salads Category
('Chicken Caesar Salad', 'Baby cos lettuce, garlic croutons, crispy bacons, shaved parmesan, & poached egg', 23.00, 'Salads', true),
('Goats Cheese Salad', 'Mixed leaves salad, pine nuts, spanish onion, pesto croutons & goat''s cheese & balsamic vinegar dressing', 23.00, 'Salads', true),
('Chicken Avocado Salad', 'Mixed leaves salad, sundried tomato, cucumber & spanish onion & balsamic vinegar dressing', 23.00, 'Salads', true),
('Tuna Salad', 'Chunk tuna, mixed lettuce, onion, tomato with aioli dressing', 23.00, 'Salads', true),
('Smoked Salmon Salad', 'Mixed leaves salad, smoked salmon, cucumber & spanish onion, sundried tomato & balsamic vinegar dressing', 25.00, 'Salads', true),

-- Omelette Category
('Ham / Cheese / Tomato & Toast', '', 22.00, 'Omelette', true),
('Mushrooms / Spinach / Tomato / Onion / Cheese & Toast', '', 22.00, 'Omelette', true),
('Bacon / Mushroom / Onion / Cheese', '', 23.00, 'Omelette', true),
('Skinny Omelette', 'With egg whites, mushrooms, spinach, goat''s cheese', 23.00, 'Omelette', true),
('Smoked Salmon Omelette', 'Mushrooms, spinach, cheese & toast', 24.00, 'Omelette', true),

-- Burgers | Sandwiches | Wraps Category
('Beef Burger', '150g beef patty, lettuce, tomato, beetroot, cheese, caramelized onion. Add chips or salad $3', 19.00, 'Burgers | Sandwiches | Wraps', true),
('Grilled Chicken Burger', 'Chicken breast, lettuce, tomato, bee root, cheese, guacamole & aioli sauce. Add chips or salad $3', 19.00, 'Burgers | Sandwiches | Wraps', true),
('Veggie Burger', 'Crusted vegetable patty, tomato, cheese, avocado, sour cream & sweet chilli sauce. Add chips or salad $3', 19.00, 'Burgers | Sandwiches | Wraps', true),
('Aussie Burger', '150g beef patty, lettuce, tomato, beetroot, cheese, bacon, egg, caramelized onion. Add chips or salad $3', 22.00, 'Burgers | Sandwiches | Wraps', true),
('Marini Chicken Burger', 'Chicken breast, bacon and eggs, lettuce, tomato, beetroot, cheese, guacamole & aioli sauce. Add chips or salad $3', 22.00, 'Burgers | Sandwiches | Wraps', true),
('Steak Sandwich', '150g scotch fillet steak, caramelized onion, lettuce, tomato, beetroot & cheese. Add chips or salad $3', 20.00, 'Burgers | Sandwiches | Wraps', true),
('Chicken Toast Turkish', 'Grilled chicken breast, guacamole & cheese, aioli sauce. Add chips or salad $3', 18.00, 'Burgers | Sandwiches | Wraps', true),
('Vegetable Delight', 'Lettuce, roasted pumpkin, eggplant, chargrilled capsicam, avocado & goat''s cheese. Add chips or salad $3', 18.00, 'Burgers | Sandwiches | Wraps', true),
('Smoked Salmon Turkish', 'Cream cheese, spanish onion, capers, spinach & smoked salmon; served on toasted turkish. Add chips or salad $3', 20.00, 'Burgers | Sandwiches | Wraps', true),
('BLTA', 'Bacon, lettuce, tomato, avocado, & aioli. Add chips or salad $3', 18.00, 'Burgers | Sandwiches | Wraps', true),
('Chicken Schnitzel', 'Wrap, open or burger lettuce, tomato, cucumber, cheese with aioli sauce; add chips or salad $3', 18.00, 'Burgers | Sandwiches | Wraps', true),
('Smoked Salmon Wrap', 'Smoked salmon, lettuce, avocado, onion, cream cheese, & capers. Add chips or salad $3', 20.00, 'Burgers | Sandwiches | Wraps', true),
('Chicken Caesar Wrap', 'Chicken, egg, bacon, ceasar sauce, cheese & lettuce. Add chips or salad $2', 18.00, 'Burgers | Sandwiches | Wraps', true),
('Small Bowl Chips', '', 8.00, 'Burgers | Sandwiches | Wraps', true),
('Large Bowl Chips', '', 10.00, 'Burgers | Sandwiches | Wraps', true),

-- Marini's Specials Category
('Brekky Roll', 'Fried eggs, Bacon, Avocado, Hash brown on Milk Bun Tomato, BBQ or Aloli tomato relish extra $1', 15.00, 'Marini''s Specials', true),
('Brekky Wrap', 'Scrambled egg, Avocado, Grilled Halloumi, in Wrap', 15.00, 'Marini''s Specials', true),
('Halloumi Wrap', '', 15.00, 'Marini''s Specials', true),
('Egg & Sausage Roll', 'Fried eggs, Beef Sausages tomato or BBQ Sauce', 12.00, 'Marini''s Specials', true),
('Smashed Avo', 'On Sour Dough, Smashed Avo, Grilled tomato, Runny poached eggs. (Add Bacon S4)', 19.00, 'Marini''s Specials', true),
('Healthy Brekky', 'On Soy linseed Bread, Scrambled Egg White, Smashed Avo, Fresh Tomato & Spinach', 21.00, 'Marini''s Specials', true),
('Feta Smashed Avo', 'On Sour Dough with Smashed Avo, Runny Poached Eggs with Feta cheese.', 20.00, 'Marini''s Specials', true),
('Breakfast Stack', 'Choice of Toast, Poached Eggs, Bacon & Baked Beans', 20.00, 'Marini''s Specials', true),
('Halloumi Stack', 'On Organic Rye Sour Dough with Mashed Avo, Spinach, Grilled Halloumi & Poached eggs', 21.00, 'Marini''s Specials', true),
('Salmon Stack', 'On Organic Rye Sour Dough with Spinach, Smashed Avo, Smoked Salmon, Runny Poached Eggs', 22.00, 'Marini''s Specials', true),
('Brekky Bowl', 'Poached eggs, Smashed avocado, Spinach, Quinoa Rice, Roasted pumpkin, Beetroot', 22.00, 'Marini''s Specials', true),
('Bruschetta', 'Chopped Tomato, Onion, pesto Choice of Halloumi OR Avocado', 14.00, 'Marini''s Specials', true),
('Chicken Schnitzel Parmigiana', 'Chicken Schnitzel, Napoli Sauce, Cheese Served With Salad & Chips', 22.00, 'Marini''s Specials', true),
('Spaghetti Carbonara', 'Spaghetti Pasta Bacon Onion and Egg Creamy Sauce', 22.00, 'Marini''s Specials', true),
('Seafood Marinara', 'Spaghetti pasta, mixed seafood With Napoli sauce, touch chili and cream', 25.00, 'Marini''s Specials', true),
('Half BBQ Pork Ribs', 'With Chips and Salad', 22.00, 'Marini''s Specials', true),
('Full BBQ Pork Ribs', 'With Chips and Salad', 39.00, 'Marini''s Specials', true),
('Marini''s Special Taco', '', 14.00, 'Marini''s Specials', true),
('Portuguese Chicken', 'With chips and salad choice of sauce', 11.99, 'Marini''s Specials', true),
('BBQ Chicken', 'With chips and salad choice of sauce', 11.99, 'Marini''s Specials', true),
('T-Bone Steak', 'With Salad & Chips Mushroom Sauce', 28.00, 'Marini''s Specials', true),

-- Just Seafood Category
('Barramundi Fillet', '', 26.00, 'Just Seafood', true),
('Salmon Fillet', '', 27.00, 'Just Seafood', true),
('Seafood Basket', '', 25.00, 'Just Seafood', true),
('Fish & Chips', '', 22.00, 'Just Seafood', true),
('Salt & Pepper Squid', '', 22.00, 'Just Seafood', true),

-- Little Nippers Category
('Small Bowl Chips', '', 8.00, 'Little Nippers', true),
('Large Bowl Chips', '', 10.00, 'Little Nippers', true),
('Kids Fish & Chips', '', 14.00, 'Little Nippers', true),
('Kids Chicken Nuggets & Chips', '', 13.00, 'Little Nippers', true),
('Kids Calamari Rings & Chips', '', 13.00, 'Little Nippers', true),
('Kids Beef Burger with Chips', '', 15.00, 'Little Nippers', true),
('Kids Scrambled Eggs on Toast', '', 13.00, 'Little Nippers', true),
('Kids Pancakes', '', 13.00, 'Little Nippers', true),
('Babycino', '', 2.00, 'Little Nippers', true),
('Kids Milkshake', '', 8.00, 'Little Nippers', true),
('Kids Hot Choc with Marshmellows', '', 5.00, 'Little Nippers', true);

-- Verify the insert
SELECT categoria, COUNT(*) as total_items, MIN(precio) as min_price, MAX(precio) as max_price
FROM menu_items
GROUP BY categoria
ORDER BY categoria;

