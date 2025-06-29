import React, { useState } from 'react';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

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
          <ProductForm onAddProduct={handleAddProduct} />
          <ProductList products={products} />
        </main>
      </div>
    </div>
  );
}

export default App;