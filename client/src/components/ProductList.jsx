import React, { useState } from 'react';
import './ProductList.css';

function ProductList({ products, onDeleteProduct, onUpdateProduct }) {
  const [editProduct, setEditProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm gọi khi nhấn nút "Edit"
  const handleEdit = (product) => {
    setEditProduct(product);               
    setEditName(product.name);        
    setEditPrice(product.price.toString());
    setEditDescription(product.description || '');
    setEditCategory(product.category || '');
  };

  // Hàm xử lý khi nhấn "Save" trong form sửa
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    
    if (!editName || !editPrice) {
      alert('Please fill in required fields (name and price)');
      return;
    }

    setLoading(true);
    
    try {
      const updatedProduct = {
        ...editProduct,
        name: editName.trim(),
        price: parseFloat(editPrice),
        description: editDescription.trim() || null,
        category: editCategory.trim() || null,
      };
      
      await onUpdateProduct(updatedProduct);
      
      // Reset edit state
      setEditProduct(null);
      setEditName('');
      setEditPrice('');
      setEditDescription('');
      setEditCategory('');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        await onDeleteProduct(id);
        console.log("Product with id", id, "deleted successfully.");
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      } finally {
        setLoading(false);
      }
    }
  };

  // Hàm hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditProduct(null);
    setEditName('');
    setEditPrice('');
    setEditDescription('');
    setEditCategory('');
  };

  return (
    <div className="product-list">
      <h2>Product List ({products.length} items)</h2>

      {/* Bảng hiển thị danh sách sản phẩm */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>In Stock</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                  <td>{product.description || 'N/A'}</td>
                  <td>{product.category || 'N/A'}</td>
                  <td>
                    <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleEdit(product)}
                      disabled={loading || editProduct}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      disabled={loading}
                      className="delete-btn"
                    >
                      {loading ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form chỉnh sửa sản phẩm */}
      {editProduct && (
        <div className="edit-form-container">
          <h3>Edit Product</h3>
          <form onSubmit={handleSaveEdit} className="edit-form">
            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                disabled={loading}
                rows="3"
                placeholder="Enter description (optional)"
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                disabled={loading}
                placeholder="Enter category (optional)"
              />
            </div>
            <div className="form-actions">
              <button 
                type="submit" 
                disabled={loading}
                className="save-btn"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button" 
                onClick={handleCancelEdit}
                disabled={loading}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductList;