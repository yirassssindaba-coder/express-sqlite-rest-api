import { Router } from 'express';
import db from '../database.js';
import { validateProduct, validateId } from '../middleware/validation.js';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const { category, search, limit, offset } = req.query;
    
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    query += ' ORDER BY id DESC';
    
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        query += ' LIMIT ?';
        params.push(limitNum);
        
        if (offset) {
          const offsetNum = parseInt(offset, 10);
          if (!isNaN(offsetNum) && offsetNum >= 0) {
            query += ' OFFSET ?';
            params.push(offsetNum);
          }
        }
      }
    }
    
    const products = db.prepare(query).all(...params);
    const total = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    
    res.json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
      meta: {
        total: total,
        count: products.length
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validateId, (req, res, next) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${req.params.id} not found`
      });
    }
    
    res.json({
      success: true,
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', validateProduct, (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;
    
    const result = db.prepare(`
      INSERT INTO products (name, description, price, stock, category)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      name.trim(),
      description || null,
      price,
      stock,
      category || null
    );
    
    const newProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateId, validateProduct, (req, res, next) => {
  try {
    const existingProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${req.params.id} not found`
      });
    }
    
    const { name, description, price, stock, category } = req.body;
    
    const updatedName = name !== undefined ? name.trim() : existingProduct.name;
    const updatedDescription = description !== undefined ? description : existingProduct.description;
    const updatedPrice = price !== undefined ? price : existingProduct.price;
    const updatedStock = stock !== undefined ? stock : existingProduct.stock;
    const updatedCategory = category !== undefined ? category : existingProduct.category;
    
    db.prepare(`
      UPDATE products 
      SET name = ?, description = ?, price = ?, stock = ?, category = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(updatedName, updatedDescription, updatedPrice, updatedStock, updatedCategory, req.params.id);
    
    const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validateId, (req, res, next) => {
  try {
    const existingProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${req.params.id} not found`
      });
    }
    
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    
    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: existingProduct
    });
  } catch (error) {
    next(error);
  }
});

export default router;
