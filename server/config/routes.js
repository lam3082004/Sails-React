module.exports.routes = {
  '/': { view: 'pages/homepage' },

  'GET /api/ping': function(req, res) {
    return res.ok({ message: 'pong' });
  },

  // CRUD routes cho Product
  'GET /api/products': 'ProductController.find',
  'GET /api/products/:id': 'ProductController.findOne',
  'POST /api/products': 'ProductController.create',
  'PUT /api/products/:id': 'ProductController.update',
  'DELETE /api/products/:id': 'ProductController.destroy'
};
