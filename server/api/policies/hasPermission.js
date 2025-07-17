const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async function (req, res, proceed) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.forbidden({ message: 'Bạn phải đăng nhập!' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Lấy permission cần kiểm tra từ config policy
    const requiredPermission = req.options.permission;
    if (!requiredPermission) return res.forbidden({ message: 'Permission không xác định!' });

    // Lấy tất cả role của user
    const userRoles = await UserRole.find({ user: decoded.id });
    const roleIds = userRoles.map(ur => ur.role);

    // Lấy tất cả permission của các role
    const rolePermissions = await RolePermission.find({ role: roleIds }).populate('permission');
    const userPermissions = rolePermissions.map(rp => rp.permission.name);

    if (userPermissions.includes(requiredPermission)) {
      return proceed();
    } else {
      return res.forbidden({ message: 'Bạn không có quyền thực hiện chức năng này!' });
    }
  } catch (err) {
    return res.forbidden({ message: 'Token không hợp lệ!' });
  }
};
