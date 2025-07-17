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

  // Role
  'POST /api/userrole/assignRole': 'UserRoleController.assignRole',
  // http://localhost:1337/api/userrole/assignRole
  // {
  //   "userId": "68786d6ac6c4083f02fe2e9f",
  //   "roleId": "687871479331392058c92f0c"
  // }
};
