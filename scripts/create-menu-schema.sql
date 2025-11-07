-- Create menu_categories table
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Clear existing data (for idempotency)
DELETE FROM menu_items;
DELETE FROM menu_categories;

-- Insert categories
INSERT INTO menu_categories (name, description, display_order) VALUES
('Antipasti', 'Starters and small plates', 1),
('Piatti Principali', 'Main courses', 2),
('Dolci', 'Desserts', 3);

-- Insert menu items for Hostaria dei Ricordi
INSERT INTO menu_items (category_id, name, description, price, image_url, is_available)
SELECT id, 'Burrata con Pomodori', 'Burrata cremosa con pomodori freschi e olio extravergine', 12.00, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Antipasti'
UNION ALL
SELECT id, 'Salumi e Formaggi', 'Selezione di salumi e formaggi locali', 14.00, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Antipasti'
UNION ALL
SELECT id, 'Polpo alla Griglia', 'Polpo tenerissimo con limone e olio di oliva', 15.00, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Antipasti'
UNION ALL
SELECT id, 'Bruschetta al Pomodoro', 'Pane tostato con pomodori freschi e basilico', 9.00, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Antipasti'
UNION ALL
SELECT id, 'Pappardelle al Cinghiale', 'Tagliatelle fresche con ragù di cinghiale selvatico', 18.00, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Piatti Principali'
UNION ALL
SELECT id, 'Branzino al Forno', 'Branzino intero cotto al forno con erbe aromatiche', 24.00, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Piatti Principali'
UNION ALL
SELECT id, 'Ossobuco alla Milanese', 'Stinco di vitello brasato con riso alla milanese', 22.00, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Piatti Principali'
UNION ALL
SELECT id, 'Lasagna della Nonna', 'Lasagna preparata secondo la ricetta tradizionale', 16.00, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Piatti Principali'
UNION ALL
SELECT id, 'Tiramisu della Casa', 'Ricetta tradizionale con caffè espresso e mascarpone', 8.00, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Dolci'
UNION ALL
SELECT id, 'Panna Cotta', 'Panna cotta ai frutti di bosco con coulis', 7.00, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Dolci'
UNION ALL
SELECT id, 'Pannettone', 'Panettone artigianale con canditi e uvetta', 8.50, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Dolci'
UNION ALL
SELECT id, 'Zabaglione', 'Zabaglione tradizionale con biscotti savoiardi', 7.50, '/placeholder.svg?height=250&width=400', true FROM menu_categories WHERE name = 'Dolci';
