module.exports = {
  attributes: {
    id: { type: 'string', columnName: '_id' },
    user: { model: 'user', required: true },
    role: { model: 'role', required: true }
  }
};
