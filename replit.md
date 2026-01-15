# RESTful API Backend

## Overview
RESTful API Backend berbasis Express.js dengan SQLite database. API ini menyediakan operasi CRUD untuk manajemen produk dengan validasi request, error handling terpusat, dan format response yang konsisten.

## Project Structure
```
├── src/
│   ├── app.js                 # Main Express application
│   ├── database.js            # SQLite database setup
│   ├── routes/
│   │   └── products.js        # Product CRUD routes
│   └── middleware/
│       ├── validation.js      # Request validation middleware
│       └── errorHandler.js    # Centralized error handling
├── data/
│   └── database.sqlite        # SQLite database file
└── package.json
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (supports query: category, search, limit, offset)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Response Format
All responses follow consistent JSON format:
```json
{
  "success": true/false,
  "message": "Description",
  "data": {...}
}
```

## Features
- Request validation middleware
- Centralized error handling
- Consistent JSON response format
- 404 handler for unknown routes
- Query filtering and pagination

## Running the Project
```bash
npm start
```
Server runs on port 5000.
