module.exports = {
  assignRole: async function (req, res) {
    const { userId, roleId } = req.body;
    if (!userId || !roleId) return res.badRequest({ message: 'Thiếu userId hoặc roleId' });
    await UserRole.create({ user: userId, role: roleId });
    return res.ok({ message: 'Gán role thành công' });
  }
};
