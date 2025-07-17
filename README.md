# Sails-React CMS

## 📝 Giới thiệu
Đây là dự án **Mini CMS** sử dụng React (frontend) và Sails.js (backend) với MongoDB. Ứng dụng cho phép quản lý sản phẩm, đăng ký/đăng nhập người dùng với JWT, hỗ trợ phân quyền RBAC (admin, viewer), tìm kiếm, phân trang, CRUD cơ bản, và giao diện hiện đại.

---

## 🚀 Tính năng chính
- Đăng ký, đăng nhập, xác thực JWT
- Quản lý sản phẩm (Thêm/Sửa/Xóa/Tìm kiếm/Phân trang)
- Phân quyền RBAC: admin (toàn quyền), viewer (chỉ xem)
- Giao diện ẩn/hiện chức năng theo role
- Gán role cho user qua API
- Responsive UI, hỗ trợ dark mode

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
```

### 3. Cài đặt frontend
```bash
cd ../client
npm install
```

### 4. Cấu hình MongoDB
- Đảm bảo MongoDB đang chạy tại `mongodb://localhost:27017/sailsreact` (hoặc sửa trong `server/config/datastores.js`)

### 5. Seed role mặc định
```bash
cd ../server
node seed_roles.js
```

### 6. Chạy backend
```bash
cd server
npm start
# hoặc
sails lift
```

### 7. Chạy frontend
```bash
cd ../client
npm run dev
```

- Frontend chạy tại: `http://localhost:5173`
- Backend chạy tại: `http://localhost:1337`

---

## 🛠️ Cách triển khai & sử dụng

- Đăng ký tài khoản mới: sẽ có role mặc định là **viewer** (chỉ xem sản phẩm)
- Để gán role **admin** cho user, dùng API:
  - `POST http://localhost:1337/api/userrole/assignRole`
  - Body:
    ```json
    {
      "userId": "<id_user>",
      "roleId": "<id_role_admin>"
    }
    ```
- Chỉ **admin** mới thấy và thao tác được các nút Thêm/Sửa/Xóa sản phẩm
- Nếu không phải admin, truy cập `/add` sẽ hiện thông báo không có quyền
- Sau khi gán role admin, cần đăng xuất và đăng nhập lại để cập nhật quyền
- Khi đăng ký thành công sẽ hiện alert và tự động chuyển sang form đăng nhập

---

## 💡 Gợi ý phát triển tiếp theo
- Thêm phân quyền chi tiết hơn (nhiều role, permission động)
- Thêm chức năng quản lý user, quản lý role/permission qua giao diện
- Thêm upload ảnh sản phẩm
- Thêm chức năng quên mật khẩu, xác thực email
- Viết unit test cho backend/frontend
- Tích hợp CI/CD, Docker
- Viết tài liệu API chi tiết (Swagger)
- Tối ưu UI/UX, thêm đa ngôn ngữ

---

## 📁 Cấu trúc thư mục
- `server/` - Backend SailsJS
- `client/` - Frontend ReactJS

---

## 🛠️ Các chức năng nổi bật
- Đăng ký/Đăng nhập: Lưu token vào localStorage, xác thực qua JWT.
- Quản lý sản phẩm: CRUD, tìm kiếm, phân trang (gọi API backend).
- Dark mode: Lưu theme vào localStorage, chuyển đổi giao diện.
- Session info: Đếm số lần truy cập session, hiển thị ở footer.
- Footer: Hiển thị thời gian truy cập gần nhất, theme, user, session.
- DevTools: Có thể debug API, localStorage, sessionStorage, cookie qua Chrome DevTools.

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

### UserRole & Role
- `POST /api/userrole/assignRole` — Gán role cho user
- (Có thể bổ sung API lấy danh sách role, user...)

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
- Bùi Tùng Lâm

---