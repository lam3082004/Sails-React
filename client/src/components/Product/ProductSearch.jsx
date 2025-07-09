import React from 'react';

function ProductSearch({
  searchTerm, minPrice, maxPrice, category,
  setSearchTerm, setMinPrice, setMaxPrice, setCategory,
  onFilter, onClear
}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Tìm theo tên..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min giá"
        value={minPrice}
        min="0"
        onChange={e => setMinPrice(e.target.value)}
        style={{ width: '100px', marginLeft: '8px' }}
      />
      <input
        type="number"
        placeholder="Max giá"
        value={maxPrice}
        min="0"
        onChange={e => setMaxPrice(e.target.value)}
        style={{ width: '100px', marginLeft: '8px' }}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        style={{ width: '120px', marginLeft: '8px' }}
      />
      <button onClick={onFilter} className="filter-btn">Lọc sản phẩm</button>
      <button onClick={onClear} className="clear-btn">Xóa tìm</button>
    </div>
  );
}

export default ProductSearch;