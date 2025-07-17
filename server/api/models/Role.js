module.exports = {
  attributes: {
    id: { type: 'string', columnName: '_id' },
    name: { type: 'string', required: true, unique: true },
    description: { type: 'string', allowNull: true }
  }
};
