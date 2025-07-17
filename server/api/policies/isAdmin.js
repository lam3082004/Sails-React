module.exports = async function (req, res, proceed) {
  // Lấy userId từ JWT (req.user) hoặc session
  const userId = (req.user && req.user.id) || req.session.userId;
  if (!userId) return res.forbidden();

  const userRoles = await UserRole.find({ user: userId }).populate('role');
  const isAdmin = userRoles.some(ur => ur.role && ur.role.name === 'admin');
  if (isAdmin) return proceed();

  return res.forbidden('Bạn không có quyền thực hiện thao tác này');
};
