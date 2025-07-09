import React, { useState } from 'react';
import './ProductForm.css';

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !price) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const productData = {
        name: name.trim(),
        price: parseFloat(price),
        description: description.trim() || null,
        category: category.trim() || null,
        inStock: true // Mặc định là có sẵn
      };

      const result = await onAddProduct(productData);
      
      if (result && result.success) {
        // Reset form sau khi thêm thành công
        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setMessage(result.message || 'Product added successfully!');
        
        // Xóa message sau 3 giây
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(result?.error || 'Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form">
      <h2>Add New Product</h2>
      {message && (
        <div 
          className={`message ${message.includes('success') ? 'success' : 'error'}`}
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
            color: message.includes('success') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('success') ? '#c3e6cb' : '#f5c6cb'}`
          }}
        >
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            disabled={loading}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            disabled={loading}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description (optional)"
            disabled={loading}
            rows="3"
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category (optional)"
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;