import express from 'express';
import productRoutes from './routes/products.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RESTful API Backend</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); min-height: 100vh; color: #fff; padding: 40px 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 40px; }
    .header h1 { font-size: 2.5rem; margin-bottom: 10px; background: linear-gradient(90deg, #00d4ff, #7b2cbf); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .header .version { background: #7b2cbf; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; display: inline-block; }
    .header p { color: #a0a0a0; margin-top: 15px; }
    .section { background: rgba(255,255,255,0.05); border-radius: 15px; padding: 25px; margin-bottom: 25px; border: 1px solid rgba(255,255,255,0.1); }
    .section h2 { color: #00d4ff; margin-bottom: 20px; font-size: 1.3rem; display: flex; align-items: center; gap: 10px; }
    .endpoint { background: rgba(0,0,0,0.3); border-radius: 10px; padding: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 15px; transition: transform 0.2s; }
    .endpoint:hover { transform: translateX(5px); }
    .method { padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 0.85rem; min-width: 70px; text-align: center; }
    .get { background: #10b981; }
    .post { background: #3b82f6; }
    .put { background: #f59e0b; }
    .delete { background: #ef4444; }
    .endpoint-path { font-family: 'Courier New', monospace; color: #fff; font-size: 0.95rem; }
    .endpoint-desc { color: #a0a0a0; font-size: 0.9rem; margin-left: auto; }
    .response-format { background: #0d1117; border-radius: 10px; padding: 20px; font-family: 'Courier New', monospace; font-size: 0.9rem; overflow-x: auto; }
    .response-format .key { color: #7ee787; }
    .response-format .string { color: #a5d6ff; }
    .response-format .bool { color: #ff7b72; }
    .footer { text-align: center; color: #666; margin-top: 40px; font-size: 0.9rem; }
    .status { display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.2); padding: 8px 16px; border-radius: 20px; color: #10b981; }
    .status-dot { width: 10px; height: 10px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>RESTful API Backend</h1>
      <span class="version">v1.0.0</span>
      <p>API Backend berbasis Express.js dengan SQLite Database</p>
      <div style="margin-top: 20px;">
        <span class="status"><span class="status-dot"></span> Server Running</span>
      </div>
    </div>
    
    <div class="section">
      <h2>Endpoints - Products</h2>
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="endpoint-path">/api/products</span>
        <span class="endpoint-desc">Ambil semua produk (filter: ?category, ?search, ?limit, ?offset)</span>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="endpoint-path">/api/products/:id</span>
        <span class="endpoint-desc">Ambil produk berdasarkan ID</span>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="endpoint-path">/api/products</span>
        <span class="endpoint-desc">Buat produk baru</span>
      </div>
      <div class="endpoint">
        <span class="method put">PUT</span>
        <span class="endpoint-path">/api/products/:id</span>
        <span class="endpoint-desc">Update produk berdasarkan ID</span>
      </div>
      <div class="endpoint">
        <span class="method delete">DELETE</span>
        <span class="endpoint-path">/api/products/:id</span>
        <span class="endpoint-desc">Hapus produk berdasarkan ID</span>
      </div>
    </div>
    
    <div class="section">
      <h2>Format Response</h2>
      <div class="response-format">
<pre>{
  <span class="key">"success"</span>: <span class="bool">true</span> | <span class="bool">false</span>,
  <span class="key">"message"</span>: <span class="string">"Deskripsi hasil operasi"</span>,
  <span class="key">"data"</span>: { ... } | [ ... ]
}</pre>
      </div>
    </div>
    
    <div class="section">
      <h2>Contoh Request Body (POST/PUT)</h2>
      <div class="response-format">
<pre>{
  <span class="key">"name"</span>: <span class="string">"Nama Produk"</span>,
  <span class="key">"description"</span>: <span class="string">"Deskripsi produk"</span>,
  <span class="key">"price"</span>: 100000,
  <span class="key">"stock"</span>: 50,
  <span class="key">"category"</span>: <span class="string">"Kategori"</span>
}</pre>
      </div>
    </div>
    
    <div class="footer">
      <p>Gunakan Postman atau Thunder Client untuk menguji API</p>
    </div>
  </div>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
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
