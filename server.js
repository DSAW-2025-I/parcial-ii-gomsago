const express = require('express');
const app = express();
const PORT = 3000;

// Arreglo en memoria con productos
let products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Smartphone', price: 800 },
  { id: 3, name: 'Tablet', price: 400 }
];

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// Endpoint para obtener un producto por ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});

// Endpoint para agregar un nuevo producto
app.post('/products', (req, res) => {
  const { id, name, price } = req.body;

  const existingProduct = products.find(p => p.id === id);
  if (existingProduct) {
    return res.status(400).json({ error: 'El ID del producto ya existe' });
  }

  const newProduct = { id, name, price };
  products.push(newProduct);

  res.status(201).json(newProduct);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
