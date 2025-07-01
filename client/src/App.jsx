import React, { useState } from 'react';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);

  // Hàm thêm sản phẩm
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // Hàm xóa sản phẩm
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Hàm cập nhật sản phẩm (lifting state)
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
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

        // "name": "iPhone 15 Pro",
        // "price": 29990000,
        // "description": "Điện thoại  minh cao cấp",
        // "category": "Electronics",