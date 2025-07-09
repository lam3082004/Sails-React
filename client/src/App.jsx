import React, { useState, useEffect } from 'react';
import './App.css';
import ProductForm from './components/Product/ProductFormAdd';
import ProductList from './components/Product/ProductList';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>This is a simple CMS demo using React and Sails.js.</p>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

  // Hàm lọc sản phẩm với API GET
  const handleFilterProducts = async ({ searchTerm, minPrice, maxPrice, category }) => {
    try {
      setLoading(true);
      let url = 'http://localhost:1337/api/products/search?';
      if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
      if (minPrice) url += `minPrice=${minPrice}&`;
      if (maxPrice) url += `maxPrice=${maxPrice}&`;
      if (category) url += `category=${encodeURIComponent(category)}&`;
      const response = await axios.get(url);
      setProducts(response.data); // Nếu backend trả về {success, data} thì dùng setProducts(response.data.data)
      setError(null);
    } catch (err) {
      setError('Failed to filter products');
    } finally {
      setLoading(false);
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
    <Router>
      <div className="cms-container">
        <header className="cms-header">
          <h1>My CMS</h1>
        </header>
        <div className="cms-main">
          <aside className="cms-sidebar">
            <ul>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/add">Add Product</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
            <div className="cms-sidebar-footer">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
              </button>
            </div>
          </aside>
          <main className="cms-content">
            {error && (
              <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>
                {error}
              </div>
            )}
            <Routes>
              <Route
                path="/products"
                element={
                  <ProductList
                    products={products}
                    onDeleteProduct={handleDeleteProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onFilterProducts={handleFilterProducts}
                  />
                }
              />
              <Route path="/add" element={<ProductForm onAddProduct={handleAddProduct} />} />
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Navigate to="/products" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;