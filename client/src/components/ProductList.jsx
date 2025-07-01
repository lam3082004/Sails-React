import React, { useState } from 'react';
import './ProductList.css';

// Component ProductList nhận vào props: danh sách sản phẩm (products), hàm xóa sản phẩm (onDeleteProduct), và hàm cập nhật sản phẩm (onUpdateProduct)
function ProductList({ products, onDeleteProduct, onUpdateProduct }) {
  // Trạng thái lưu sản phẩm đang chỉnh sửa
  const [editProduct, setEditProduct] = useState(null);
  // Trạng thái lưu tên sản phẩm đang chỉnh sửa
  const [editName, setEditName] = useState('');
  // Trạng thái lưu giá sản phẩm đang chỉnh sửa
  const [editPrice, setEditPrice] = useState('');

  // Hàm gọi khi nhấn nút "Edit" → thiết lập trạng thái để hiển thị form sửa
  const handleEdit = (product) => {
    setEditProduct(product);               
    setEditName(product.name);        
    setEditPrice(product.price.toString());
  };

  // Hàm xử lý khi nhấn "Save" trong form sửa
  const handleSaveEdit = (e) => {
    e.preventDefault(); // Ngăn reload trang
    if (editName && editPrice) {
      const updatedProduct = {
        ...editProduct,                      // Giữ lại các thuộc tính cũ
        name: editName,                      // Cập nhật tên mới
        price: parseFloat(editPrice),        // Cập nhật giá mới (chuyển về dạng số)
      };
      onUpdateProduct(updatedProduct);       // Gọi hàm cập nhật từ props
      setEditProduct(null);
      setEditName('');
      setEditPrice('');
    }
  };

  // Hàm xử lý xóa sản phẩm
  const handleDelete = (id) => {
    if (onDeleteProduct) {
      onDeleteProduct(id); 
      console.log("Product with id", id, "deleted successfully.");
    } 
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>

      {/* Bảng hiển thị danh sách sản phẩm */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  {/* Nút Xóa */}
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                  {/* Nút Sửa */}
                  <button onClick={() => handleEdit(product)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit */}
      {editProduct && (
        <form onSubmit={handleSaveEdit} className="edit-form">
          <div>
            <label>Edit Name:</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <div>
            <label>Edit Price:</label>
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)} 
            />
          </div>
          <button type="submit">Save</button> 
          <button type="button" onClick={() => setEditProduct(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default ProductList;
