module.exports = {
  attributes: {
    id: { type: 'string', columnName: '_id' },
    role: { model: 'role', required: true },
    permission: { model: 'permission', required: true }
  }
};
