-- Add payment-related columns to pedidos table
ALTER TABLE pedidos 
ADD COLUMN IF NOT EXISTS payment_intent_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- Add index for payment_intent_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_pedidos_payment_intent ON pedidos(payment_intent_id);

-- Update comment
COMMENT ON COLUMN pedidos.payment_intent_id IS 'Stripe Payment Intent ID for tracking payments';
COMMENT ON COLUMN pedidos.payment_status IS 'Payment status: pending, paid, failed, refunded';

