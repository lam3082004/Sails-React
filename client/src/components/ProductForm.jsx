import React, { useState } from 'react';
import './ProductForm.css'; // Assuming you have a CSS file for styling

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price) {
      const newProduct = { id: Date.now(), name, price: parseFloat(price) };
      onAddProduct(newProduct);
      setName('');
      setPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;