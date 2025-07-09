const axios = require('axios');

const sampleProducts = [
  { name: "iPhone 15 Pro", price: "29990000 ₫", description: "Điện thoại thông minh cao cấp", category: "Electronics", inStock: true },
  { name: "Samsung Galaxy S23", price: "21990000 ₫", description: "Flagship cao cấp của Samsung", category: "Electronics", inStock: true },
  { name: "MacBook Air M2", price: "28490000 ₫", description: "Apple Silicon M2 mạnh mẽ", category: "Laptop", inStock: false },
  { name: "Bàn nâng đứng văn phòng", price: "4990000 ₫", description: "Bàn làm việc chống mỏi", category: "Furniture", inStock: true },
  { name: "Bàn phím cơ Keychron K6", price: "2190000 ₫", description: "Bàn phím cơ không dây layout 65%", category: "Accessory", inStock: false },
  { name: "Kindle Paperwhite 2022", price: "3990000 ₫", description: "Máy đọc sách chống nước", category: "Gadget", inStock: true },
  { name: "Router Wi-Fi TP-Link AX3000", price: "1390000 ₫", description: "Chuẩn Wi-Fi 6, tốc độ cao", category: "Network", inStock: true },
  { name: "Máy hút bụi Dyson V11", price: "13990000 ₫", description: "Hút bụi không dây cao cấp", category: "Home", inStock: false },
  { name: "TV LG OLED 55 inch", price: "26990000 ₫", description: "Smart TV 4K, màn hình OLED", category: "Electronics", inStock: true },
  { name: "Loa Bluetooth JBL Charge 5", price: "3290000 ₫", description: "Loa chống nước, pin trâu", category: "Audio", inStock: true },
  { name: "Ổ cứng SSD Samsung 980 1TB", price: "2490000 ₫", description: "Tốc độ cao PCIe Gen3", category: "Storage", inStock: true },
  { name: "Máy in Canon LBP2900", price: "2390000 ₫", description: "Máy in laser đen trắng", category: "Office", inStock: true },
  { name: "AirPods Pro 2", price: "6990000 ₫", description: "Tai nghe không dây của Apple", category: "Audio", inStock: true },
  { name: "Máy lọc không khí Sharp", price: "5990000 ₫", description: "Lọc bụi mịn PM2.5", category: "Home", inStock: false },
  { name: "Bàn nâng đứng văn phòng", price: "4990000 ₫", description: "Bàn làm việc chống mỏi", category: "Furniture", inStock: true }
];

Promise.all(sampleProducts.map(product =>
  axios.post('http://localhost:1337/api/products', product)
)).then(() => {
  console.log('Import thành công!');
}).catch(err => {
  console.error('Import thất bại:', err.message);
});