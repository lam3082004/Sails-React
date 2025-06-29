import React from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
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
          <ProductList />
        </main>
      </div>
    </div>
  );
}

export default App;