# Mini CMS Project (React + Sails.js)

## 📝 Giới thiệu
Đây là dự án **Mini CMS** sử dụng React (frontend) và Sails.js (backend) với MongoDB. Ứng dụng cho phép quản lý sản phẩm, đăng ký/đăng nhập người dùng với JWT, hỗ trợ dark mode, tìm kiếm, phân trang, CRUD cơ bản, ... 

---

## 🚀 Tính năng chính
- Đăng ký, đăng nhập, đăng xuất (JWT, Bcrypt)
- Quản lý sản phẩm: Thêm, sửa, xóa, tìm kiếm, phân trang
- Tìm kiếm và phân trang thực hiện trên backend
- Lưu theme (light/dark) và trạng thái đăng nhập bằng localStorage
- Lưu session info, pageViews bằng sessionStorage
- Lưu thời gian truy cập gần nhất (localStorage, hiển thị ở footer)
- Giao diện responsive, hiện đại, hỗ trợ dark mode
- Bảo vệ route, chỉ user đăng nhập mới thao tác sản phẩm
- Giao tiếp API qua axios, xử lý lỗi, loading

---

## 🏗️ Cấu trúc thư mục
```
Sails-React/
  client/      # React frontend
  server/      # Sails.js backend
```

---

## ⚙️ Hướng dẫn cài đặt & chạy
### 1. Clone project
```bash
git clone <repo-url>
cd Sails-React
```

### 2. Cài đặt backend
```bash
cd server
npm install
cp .env.example .env # hoặc tự tạo file .env với JWT_SECRET, DB info
npm run dev
```

### 3. Cài đặt frontend
```bash
cd ../client
npm install
npm run dev
```

- Frontend chạy tại: `http://localhost:5173`
- Backend chạy tại: `http://localhost:1337`

---

## 🔑 Tài khoản mẫu
- Đăng ký tài khoản mới hoặc dùng tài khoản đã có trong DB.

---

## 🛠️ Các chức năng nổi bật
- **Đăng ký/Đăng nhập:** Lưu token vào localStorage, xác thực qua JWT.
- **Quản lý sản phẩm:** CRUD, tìm kiếm, phân trang (gọi API backend).
- **Dark mode:** Lưu theme vào localStorage, chuyển đổi giao diện.
- **Session info:** Đếm số lần truy cập session, hiển thị ở footer.
- **Footer:** Hiển thị thời gian truy cập gần nhất, theme, user, session.
- **DevTools:** Có thể debug API, localStorage, sessionStorage, cookie qua Chrome DevTools.

---

## 📚 API Backend (Sails.js)
### Auth
- `POST /api/register` — Đăng ký
- `POST /api/login` — Đăng nhập
- `POST /api/logout` — Đăng xuất
- `GET /api/verify-token` — Kiểm tra token

### Product
- `GET /api/products` — Lấy danh sách sản phẩm (có phân trang, search)
- `POST /api/products` — Thêm sản phẩm
- `PUT /api/products/:id` — Sửa sản phẩm
- `DELETE /api/products/:id` — Xóa sản phẩm
- `GET /api/products/search` — Tìm kiếm sản phẩm (nếu có)

> **Lưu ý:** Các route sản phẩm yêu cầu JWT (Authorization: Bearer ...)

---

## 🗂️ Gợi ý phát triển tiếp
- Thêm phân quyền (admin/user)
- Thêm upload ảnh sản phẩm
- Thêm chức năng quên mật khẩu
- Viết unit test cho backend/frontend
- Tích hợp CI/CD, Docker
- Viết tài liệu API chi tiết (Swagger)
- ....
---

## 🧑‍💻 Công nghệ sử dụng
- React, React Router, Axios, CSS thuần
- Sails.js, MongoDB, JWT, Bcrypt
- Postman, VSCode, Cursor Git

---

## 📄 Tài liệu tham khảo
- [React](https://react.dev/)
- [Sails.js](https://sailsjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---

## ✨ Tác giả 
- Tác giả: Bùi Tùng Lâm