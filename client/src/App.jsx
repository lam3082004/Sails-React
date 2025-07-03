import React, { useState, useEffect } from 'react';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Hàm gọi API để lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:1337/api/products');
      
      // Kiểm tra response structure: { success, data, message }
      if (response.data.success && response.data.data) {
        setProducts(response.data.data);
        setError(null);
      } else {
        setError(response.data.message || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Hàm thêm sản phẩm với API POST
  const handleAddProduct = async (productData) => {
    try {
      const response = await axios.post('http://localhost:1337/api/products', productData);
      
      if (response.data.success) {
        // Cập nhật danh sách bằng cách fetch lại từ server
        await fetchProducts();
        return { success: true, data: response.data.data, message: response.data.message };
      } else {
        setError(response.data.message || 'Failed to add product');
        return { success: false, error: response.data.message };
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product');
      return { success: false, error: err.message };
    }
  };

  // Hàm xóa sản phẩm với API DELETE
  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:1337/api/products/${id}`);
      
      if (response.data.success) {
        // Cập nhật danh sách bằng cách fetch lại từ server
        await fetchProducts();
      } else {
        setError(response.data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    }
  };

  // Hàm cập nhật sản phẩm với API PUT
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:1337/api/products/${updatedProduct.id}`, updatedProduct);
      
      if (response.data.success) {
        // Cập nhật danh sách bằng cách fetch lại từ server
        await fetchProducts();
      } else {
        setError(response.data.message || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product');
    }
  };

  if (loading) {
    return (
      <div className="cms-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="cms-container">
      <header className="cms-header">
        <h1>My CMS</h1>
      </header>
      <div className="cms-main">
        <aside className="cms-sidebar">
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </aside>
        <main className="cms-content">
          {error && (
            <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>
              {error}
            </div>
          )}
          <ProductForm onAddProduct={handleAddProduct} />
          <ProductList
            products={products}
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={handleUpdateProduct}
          />
        </main>
      </div>
    </div>
  );
}

export default App;