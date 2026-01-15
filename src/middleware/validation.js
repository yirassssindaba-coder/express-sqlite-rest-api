export function validateProduct(req, res, next) {
  const { name, price, stock } = req.body;
  const errors = [];

  if (req.method === 'POST') {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.push({ field: 'name', message: 'Name is required and must be a non-empty string' });
    }
    
    if (price === undefined || price === null) {
      errors.push({ field: 'price', message: 'Price is required' });
    } else if (typeof price !== 'number' || price < 0) {
      errors.push({ field: 'price', message: 'Price must be a positive number' });
    }
    
    if (stock === undefined || stock === null) {
      errors.push({ field: 'stock', message: 'Stock is required' });
    } else if (!Number.isInteger(stock) || stock < 0) {
      errors.push({ field: 'stock', message: 'Stock must be a non-negative integer' });
    }
  }

  if (req.method === 'PUT') {
    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      errors.push({ field: 'name', message: 'Name must be a non-empty string' });
    }
    
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      errors.push({ field: 'price', message: 'Price must be a positive number' });
    }
    
    if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
      errors.push({ field: 'stock', message: 'Stock must be a non-negative integer' });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
}

export function validateId(req, res, next) {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID parameter. ID must be a positive integer'
    });
  }
  
  req.params.id = id;
  next();
}
