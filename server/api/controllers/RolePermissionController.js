module.exports = {
  assignPermission: async function (req, res) {
    const { roleId, permissionId } = req.body;
    if (!roleId || !permissionId) return res.badRequest({ message: 'Thiếu roleId hoặc permissionId' });
    await RolePermission.create({ role: roleId, permission: permissionId });
    return res.ok({ message: 'Gán permission thành công' });
  }
};
