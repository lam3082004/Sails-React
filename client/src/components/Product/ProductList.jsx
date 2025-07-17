import React, { useState, useMemo } from 'react';
import './ProductList.css';
import ProductSearch from './ProductSearch';
import ProductFormEdit from './ProductFormEdit';
import useRole from '../../hooks/useRole';

function ProductList({ products, onDeleteProduct, onUpdateProduct, onFilterProducts }) {
  const [editProduct, setEditProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // state cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  
  // Hàm lấy danh sách sản phẩm
  const handleFilter = () => {
    onFilterProducts({ searchTerm, minPrice, maxPrice, category });
  };
  const handleClearSearch = () => {
    setSearchTerm('');
    setMinPrice(''); 
    setMaxPrice('');
    setCategory('');
    onFilterProducts({ searchTerm: '', minPrice: '', maxPrice: '', category: '' });
  };

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Reset về trang 1 khi filter
  React.useEffect(() => { setCurrentPage(1); }, [products]);

  // Tối ưu render bảng bằng useMemo
  const productsToShow = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, currentPage]);

  const { isAdmin } = useRole();

  return (
    <div className="product-list">
      <h2>Product List ({products.length} items)</h2>
      {/* {isAdmin && <button onClick={() => setEditProduct({ id: 'new', name: '', price: '', description: '', category: '', inStock: true })}>Thêm sản phẩm</button>} */}
      <ProductSearch
        searchTerm={searchTerm}
        minPrice={minPrice}
        maxPrice={maxPrice}
        category={category}
        setSearchTerm={setSearchTerm}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setCategory={setCategory}
        onFilter={handleFilter}
        onClear={handleClearSearch}
      />
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
            {productsToShow.length > 0 ? (
              productsToShow.map((product, index) => (
                <tr key={product.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
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
                    {isAdmin && (
                      <>
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
                      </>
                    )}
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
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="pagination-btn" style={{marginRight: 8}}>
            Previous
          </button>
          <span style={{margin: '0 12px'}}> {currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="pagination-btn">
            Next
          </button>
        </div>
      )}
      {/* Form chỉnh sửa sản phẩm */}
      <ProductFormEdit
        editProduct={editProduct}
        editName={editName}
        setEditName={setEditName}
        editPrice={editPrice}
        setEditPrice={setEditPrice}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editCategory={editCategory}
        setEditCategory={setEditCategory}
        loading={loading}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
      />
    </div>
  );
}

export default ProductList;