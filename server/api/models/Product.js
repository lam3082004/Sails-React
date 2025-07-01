/**
 * Product.js
 *
 * @description :: Model cho sản phẩm trong CMS
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      maxLength: 200,
      example: 'iPhone 15 Pro'
    },

    price: {
      type: 'number',
      required: true,
      min: 0,
      example: 29990000
    },

    description: {
      type: 'string',
      allowNull: true,
      maxLength: 1000,
      example: 'Điện thoại thông minh cao cấp'
    },

    category: {
      type: 'string',
      allowNull: true,
      example: 'Electronics'
    },

    inStock: {
      type: 'boolean',
      defaultsTo: true
    },

    createdAt: {
      type: 'number',
      autoCreatedAt: true
    },

    updatedAt: {
      type: 'number',
      autoUpdatedAt: true
    }
  }
};
