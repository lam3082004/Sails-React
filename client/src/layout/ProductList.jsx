const ProductList = () => {
  // Dữ liệu hardcoded - không cần API
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: "29,990,000 VNĐ",
      description: "Smartphone cao cấp với chip A17 Pro",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "MacBook Air M2",
      price: "28,990,000 VNĐ",
      description: "Laptop siêu mỏng với chip M2",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: "6,990,000 VNĐ",
      description: "Tai nghe không dây chống ồn",
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop"
    }
  ];

  return (
    <div className="product-list">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Danh sách sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">{product.price}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;