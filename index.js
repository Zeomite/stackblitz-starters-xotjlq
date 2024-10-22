const express = require('express');
const cors = require('cors');
const app = express();
let port = 3000;

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

app.get('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.query;
  cart.push({
    productId: parseInt(productId),
    name,
    price: parseFloat(price),
    quantity: parseInt(quantity),
  });
  res.json({ cartItems: cart });
});

app.get('/cart/edit', (req, res) => {
  const { productId, quantity } = req.query;
  const id = parseInt(productId);
  const newQuantity = parseInt(quantity);
  cart.forEach((item) => {
    if (item.productId === id) {
      item.quantity = newQuantity;
    }
  });
  res.json({ cartItems: cart });
});

app.get('/cart/delete', (req, res) => {
  const { productId } = req.query;
  const id = parseInt(productId);
  cart = cart.filter((item) => item.productId !== id);
  res.json({ cartItems: cart });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  res.json({ totalQuantity });
});

app.get('/cart/total-price', (req, res) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
