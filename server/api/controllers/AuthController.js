const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  register: async function (req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.badRequest({ message: 'Username và password là bắt buộc' });
      }
      const existing = await User.findOne({ username });
      if (existing) {
        return res.badRequest({ message: 'Username đã tồn tại' });
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({ username, password: hashedPassword }).fetch();
      // Gán role viewer mặc định
      const viewerRole = await Role.findOne({ name: 'viewer' });
      if (viewerRole) {
        await UserRole.create({ user: newUser.id, role: viewerRole.id });
      }
      return res.ok({ message: 'Đăng ký thành công', user: { id: newUser.id, username: newUser.username } });
    } catch (err) {
      return res.serverError({ message: 'Lỗi đăng ký', error: err.message });
    }
  },
  login: async function (req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.badRequest({ message: 'Username và password là bắt buộc' });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res.badRequest({ message: 'Sai username hoặc password' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.badRequest({ message: 'Sai username hoặc password' });
      }
      // Lấy roles của user
      const userRoles = await UserRole.find({ user: user.id }).populate('role');
      const roles = userRoles.map(ur => ur.role.name);
      // Tạo JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      return res.ok({ message: 'Đăng nhập thành công', token, user: { id: user.id, username: user.username, roles } });
    } catch (err) {
      return res.serverError({ message: 'Lỗi đăng nhập', error: err.message });
    }
  },
  logout: async function (req, res) {
    // Với JWT, logout chỉ là phía client xoá token. Có thể thêm blacklist token nâng cao.
    return res.ok({ message: 'Đăng xuất thành công!' });
  },
  verifyToken: async function (req, res) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.json({ success: false, message: 'No token' });
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.json({ success: true, user: { id: decoded.id, username: decoded.username } });
    } catch (err) {
      return res.json({ success: false, message: 'Invalid token' });
    }
  }
};
