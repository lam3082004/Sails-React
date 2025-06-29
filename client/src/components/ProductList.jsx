import React from 'react';
import './ProductList.css';

function ProductList({ products }) {
  return (
    <div className="product-list">
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;