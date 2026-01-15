import express from 'express';
import productRoutes from './routes/products.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to RESTful API Backend',
    version: '1.0.0',
    endpoints: {
      products: {
        'GET /api/products': 'Get all products (supports ?category, ?search, ?limit, ?offset)',
        'GET /api/products/:id': 'Get product by ID',
        'POST /api/products': 'Create new product',
        'PUT /api/products/:id': 'Update product by ID',
        'DELETE /api/products/:id': 'Delete product by ID'
      }
    },
    documentation: 'See README.md for detailed usage guide'
  });
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    available_endpoints: ['/api/products']
  });
});

app.use('/api/products', productRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /                    - API documentation');
  console.log('  GET    /api                 - API status');
  console.log('  GET    /api/products        - Get all products');
  console.log('  GET    /api/products/:id    - Get product by ID');
  console.log('  POST   /api/products        - Create product');
  console.log('  PUT    /api/products/:id    - Update product');
  console.log('  DELETE /api/products/:id    - Delete product');
});
