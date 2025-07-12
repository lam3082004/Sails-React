module.exports.routes = {
  '/': { view: 'pages/homepage' },

  'GET /api/ping': function(req, res) {
    return res.ok({ message: 'pong' });
  },

  // CRUD routes cho Product
  'GET /api/products': { controller: 'ProductController', action: 'find', policy: 'isAuthenticated' },
  'POST /api/products': { controller: 'ProductController', action: 'create', policy: 'isAuthenticated' },
  'GET /api/products/:id': 'ProductController.findOne',
  'PUT /api/products/:id': 'ProductController.update',
  'DELETE /api/products/:id': 'ProductController.destroy',

  // Search route cho Product
  'GET /api/products/search': 'ProductController.search',

  // Login/Logout
  'POST /api/register': 'AuthController.register',
  'POST /api/login': 'AuthController.login',
  'POST /api/logout': 'AuthController.logout',
  'GET /api/verify-token': 'AuthController.verifyToken',
};
