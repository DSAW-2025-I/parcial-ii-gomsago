[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/CBIH3_Lj)
# Web Development Exam - Backend with Express.js

## Overview
Este examen evalúa tu capacidad para construir un backend básico usando Express.js. Crearás una API sencilla para gestionar información de productos.

## Instrucciones
- Tienes **1:30 horas** para completar el examen.
- Escribe **código limpio y bien documentado**.
- Asegúrate de que tu aplicación se ejecute sin errores antes de enviarla.
- Usa solo **JavaScript vanilla** y **Express.js**.
- No utilices bases de datos externas; almacena los datos en memoria.
- El enlace del repositorio desplegado debe agregarse al README para poder calificar el examen. Todo repositorio sin marcar no será calificado.

## Requerimientos

1. **Crea un servidor en Express.js** que escuche en el puerto `3000`. (10 puntos)
2. **Define un arreglo en memoria** con al menos 3 productos, cada uno con:
   - `id` (numérico, único)
   - `name` (cadena de texto)
   - `price` (numérico)
   
   (10 puntos)
3. **Crea los siguientes endpoints:**
   - `GET /products` → Devuelve la lista de productos en formato JSON. (10 puntos)
   - `GET /products/:id` → Devuelve un solo producto por `id`. Si no se encuentra, retorna un error `404`. (10 puntos)
   - `POST /products` → Agrega un nuevo producto. Los datos del producto deben enviarse en el cuerpo de la solicitud en formato JSON. No olvide que el ID es único, así que si se trata de crear un producto con un ID ya existente se debe devolver un error **400 Bad Request** (10 puntos)
4. **Usa `express.json()` como middleware** para manejar solicitudes JSON. (10 puntos)

## Rúbrica de Evaluación (Total: 50 puntos)

| Criterio                                  | Puntos |
|-------------------------------------------|--------|
| Servidor escucha en el puerto 3000       | 10     |
| Lista de productos en memoria definida correctamente | 10     |
| `GET /products` devuelve todos los productos | 10     |
| `GET /products/:id` maneja IDs válidos e inválidos | 10     |
| `POST /products` agrega un nuevo producto correctamente | 10     |
| **Despliegue (Obligatorio, sin puntaje)** | **Si no se despliega el repositorio, no se califica el examen.** |

## Entrega
- Sube tu código a un **repositorio en GitHub** y despliéguelo en **vercel**.
- Agregue el enlace del repositorio desplegado al README.

¡Buena suerte!

**Nombre: Juan José Gómez Saavedra**

**NOTA**: No poseo computador personal portatil por lo que solicito un computador en la universidad. Estos computadores no tienen instalado node.js ni los recursos que necesito para poder desplegar en vercel debido a que me piden permisos de administrador (Usuario y contraseña) la  cual es información que yo no poseo. Adjunto , mi evidencia más el código.

![image](https://github.com/user-attachments/assets/17bba383-d050-4e16-83ae-fd019b3b2ad3)

![Image (1)](https://github.com/user-attachments/assets/346566e9-93fe-47d3-a05c-ff21b3768c74)

-------------------------------------------------------------------------------
**server.js**

const express = require('express');
const app = express();
const PORT = 3000;

// Aquí guardo todo en la nemoria 

let products = [
  { id: 1, name: 'Portatil', price: 2000000 },
  { id: 2, name: 'Iphone', price: 9000000 },
  { id: 3, name: 'Ipad', price: 1500000 }
];

app.use(express.json());


app.get('/products', (req, res) => {
  res.json(products);
});


app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});


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


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});



**vercel.js**

{
    "version": 2,
    "builds": [
      {
        "src": "server.js",
        "use": "@vercel/node"
      }
    ]
  }
  
  



   




