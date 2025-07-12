const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async function (req, res, proceed) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.forbidden({ message: 'Bạn phải đăng nhập!' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return proceed();
  } catch (err) {
    return res.forbidden({ message: 'Token không hợp lệ!' });
  }
};