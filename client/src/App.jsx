import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ProductForm from './components/Product/ProductFormAdd';
import ProductList from './components/Product/ProductList';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginForm from './components/authentication/LoginForm';
import RegisterForm from './components/authentication/RegisterForm';
import useRole from './hooks/useRole';

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
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [lastVisitTime, setLastVisitTime] = useState('');
  const [sessionData, setSessionData] = useState('');
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const hasIncrementedViews = useRef(false);
  const { isAdmin } = useRole();

  // Lưu thời gian truy cập gần nhất
  useEffect(() => {
    if (hasIncrementedViews.current) return;
    hasIncrementedViews.current = true;
    const now = new Date();
    const lastVisit = localStorage.getItem('lastVisitTime');
    
    if (lastVisit) {
      setLastVisitTime(new Date(lastVisit).toLocaleString('vi-VN'));
    }
    
    localStorage.setItem('lastVisitTime', now.toISOString());
    
    // Đảm bảo pageViews là số
    const prevViews = parseInt(sessionStorage.getItem('pageViews') || '0', 10);
    const newViews = prevViews + 1;
    sessionStorage.setItem('pageViews', newViews);
    // Demo sessionStorage - lưu session data
    const sessionInfo = {
      sessionId: Math.random().toString(36).substr(2, 9),
      startTime: now.toISOString(),
      pageViews: newViews
    };
    sessionStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));
    setSessionData(`Session: ${sessionInfo.sessionId} | Views: ${sessionInfo.pageViews}`);
    
    // Demo cookie - lưu user preference
    document.cookie = `userTheme=${theme}; max-age=86400; path=/`;
    document.cookie = `lastVisit=${now.toISOString()}; max-age=86400; path=/`;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch products from API when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Kiểm tra token khi app mount
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:1337/api/verify-token', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data.success && res.data.user) {
            setUser(res.data.user);
          } else {
            setUser(null);
            localStorage.removeItem('token');
          }
        } catch (err) {
          setUser(null);
          localStorage.removeItem('token');
        }
      }
    };
    checkToken();
  }, []);

  // Hàm gọi API để lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching products from API...'); // Debug log
      const response = await axios.get('http://localhost:1337/api/products');
      
      console.log('✅ API Response:', response.data); // Debug log
      
      // Kiểm tra response structure: { success, data, message }
      if (response.data.success && response.data.data) {
        setProducts(response.data.data);
        setError(null);
        console.log(`📦 Loaded ${response.data.data.length} products`); // Debug log
      } else {
        setError(response.data.message || 'Failed to fetch products');
        console.error('❌ API Error:', response.data.message); // Debug log
      }
    } catch (err) {
      console.error('🚨 Network Error:', err); // Debug log
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Hàm thêm sản phẩm với API POST
  const handleAddProduct = async (productData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:1337/api/products', productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        await fetchProducts();
        return { success: true, data: response.data.data, message: response.data.message };
      } else {
        setError(response.data.message || 'Failed to add product');
        return { success: false, error: response.data.message };
      }
    } catch (err) {
      setError('Failed to add product');
      return { success: false, error: err.message };
    }
  };

  // Hàm xóa sản phẩm với API DELETE
  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:1337/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        await fetchProducts();
      } else {
        setError(response.data.message || 'Failed to delete product');
      }
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  // Hàm cập nhật sản phẩm với API PUT
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:1337/api/products/${updatedProduct.id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        await fetchProducts();
      } else {
        setError(response.data.message || 'Failed to update product');
      }
    } catch (err) {
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
      const token = localStorage.getItem('token');
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to filter products');
    } finally {
      setLoading(false);
    }
  };

  // Khi login thành công
  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };
  // Khi logout
  const handleLogout = async () => {
    await axios.post('http://localhost:1337/api/logout');
    localStorage.removeItem('token');
    setUser(null);
  };

  // Khi đăng ký thành công
  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setShowLogin(true);
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
        <header className="cms-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1>My CMS</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="auth-buttons-top-right">
              {!user && (
                <>
                  <button onClick={() => setShowLogin(true)} style={{ marginRight: 8 }}>Đăng nhập</button>
                  <button onClick={() => setShowRegister(true)}>Đăng ký</button>
                </>
              )}
              {user && (
                <>
                  <span className="user-greeting">Hello {user.username}</span>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </>
              )}
            </div>
          </div>
        </header>
        {showLogin && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000 }}>
            <div style={{ position: 'relative', width: 'fit-content', margin: 'auto', top: '20vh' }}>
              <LoginForm onLogin={handleLogin} onClose={() => setShowLogin(false)} />
            </div>
          </div>
        )}
        {showRegister && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000 }}>
            <div style={{ position: 'relative', width: 'fit-content', margin: 'auto', top: '20vh' }}>
              <RegisterForm onSuccess={handleRegisterSuccess} onClose={() => setShowRegister(false)} />
            </div>
          </div>
        )}
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
                  user ? (
                    <ProductList
                      products={products}
                      onDeleteProduct={handleDeleteProduct}
                      onUpdateProduct={handleUpdateProduct}
                      onFilterProducts={handleFilterProducts}
                    />
                  ) : (
                    <div style={{textAlign: 'center', marginTop: 40}}>
                      <h2>Vui lòng đăng nhập để xem danh sách sản phẩm</h2>
                    </div>
                  )
                }
              />
              <Route
                path="/add"
                element={
                  user ? (
                    isAdmin ? (
                      <ProductForm onAddProduct={handleAddProduct} />
                    ) : (
                      <div style={{textAlign: 'center', marginTop: 40}}>
                        <h2>Bạn không có quyền thêm sản phẩm</h2>
                      </div>
                    )
                  ) : (
                    <div style={{textAlign: 'center', marginTop: 40}}>
                      <h2>Vui lòng đăng nhập để thêm sản phẩm</h2>
                    </div>
                  )
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Navigate to="/products" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      <footer className="cms-footer">
        <div className="footer-content">
          <p>© 2024 My CMS. Lần truy cập gần nhất: {lastVisitTime || 'Lần đầu truy cập'}</p>
          <div className="footer-storage-info">
            <span>Theme: {theme}</span>
            <span>User: {user ? user.username : 'Chưa đăng nhập'}</span>
            <span>{sessionData}</span>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;