import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'data', 'database.sqlite');

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    category TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

const existingProducts = db.prepare('SELECT COUNT(*) as count FROM products').get();
if (existingProducts.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (name, description, price, stock, category) 
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const sampleProducts = [
    ['Laptop Gaming', 'High-performance laptop for gaming', 15000000, 10, 'Electronics'],
    ['Wireless Mouse', 'Ergonomic wireless mouse', 350000, 50, 'Accessories'],
    ['Mechanical Keyboard', 'RGB mechanical keyboard', 1200000, 25, 'Accessories'],
  ];
  
  for (const product of sampleProducts) {
    insertProduct.run(...product);
  }
}

export default db;
