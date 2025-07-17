const sails = require('sails');
const rc = require('rc');
require('dotenv').config();
sails.lift(rc('sails'), async function(err) {
  if (err) {
    console.error('Error lifting Sails app:', err);
    return process.exit(1);
  }

  try {
    // Tạo role viewer nếu chưa có
    await Role.findOrCreate(
      { name: 'viewer' },
      { name: 'viewer', description: 'Chỉ được xem sản phẩm' }
    );
    // Tạo role admin nếu chưa có
    await Role.findOrCreate(
      { name: 'admin' },
      { name: 'admin', description: 'Toàn quyền sản phẩm' }
    );
    console.log('Đã seed 2 role: viewer, admin');
  } catch (e) {
    console.error(e);
  }
  return process.exit(0);
});
