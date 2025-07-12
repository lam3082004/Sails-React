/**
 * Product.js
 *
 * @description :: Model cho sản phẩm trong CMS
 */

module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
      // example: 'iPhone 15 Pro'
    },

    password: {
      type: 'string',
      required: true,
      // min: 0,
      // example: 29990000
    },
  }
};
