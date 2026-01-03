-- ============================================
-- Delete Marini's Specials Category
-- Removes all menu items from "Marini's Specials" category
-- ============================================

-- Delete all items from Marini's Specials category
DELETE FROM menu_items 
WHERE categoria = 'Marini''s Specials';

-- Verify deletion
SELECT categoria, COUNT(*) as remaining_items
FROM menu_items
GROUP BY categoria
ORDER BY categoria;

-- Show remaining items (should not show Marini's Specials)
SELECT COUNT(*) as total_items_remaining
FROM menu_items;

