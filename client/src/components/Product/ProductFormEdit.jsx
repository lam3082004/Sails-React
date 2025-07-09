import React from 'react';

function ProductFormEdit({
  editProduct,
  editName, setEditName,
  editPrice, setEditPrice,
  editDescription, setEditDescription,
  editCategory, setEditCategory,
  loading,
  handleSaveEdit,
  handleCancelEdit
}) {
  if (!editProduct) return null;
  return (
    <div className="edit-form-container">
      <h3>Edit Product</h3>
      <form onSubmit={handleSaveEdit} className="edit-form">
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
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
            onChange={e => setEditPrice(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
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
            onChange={e => setEditCategory(e.target.value)}
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
  );
}

export default ProductFormEdit;
