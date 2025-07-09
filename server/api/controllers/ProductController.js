/**
 * ProductController
 *
 * @description :: Server-side actions cho Product
 */

module.exports = {
  // GET /api/products/search - Tìm kiếm sản phẩm
  search: async function (req, res) {
    try {
      const search = req.query.search || '';
      const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : null;
      const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
      const category = req.query.category || '';

      let criteria = {};

      if (search) {
        criteria.name = { contains: search };
      }
      if (minPrice !== null || maxPrice !== null) {
        criteria.price = {};
        if (minPrice !== null) criteria.price['>='] = minPrice;
        if (maxPrice !== null) criteria.price['<='] = maxPrice;
      }
      if (category) {
        criteria.category = category;
      }

      const products = await Product.find(criteria);
      return res.json(products);
    } catch (err) {
      return res.serverError(err);
    }
  },


  // GET /api/products - Lấy tất cả sản phẩm
  find: async function (req, res) {
    try {
      const products = await Product.find();
      return res.ok({
        success: true,
        data: products,
        message: 'Lấy danh sách sản phẩm thành công'
      });
    } catch (error) {
      return res.serverError({
        success: false,
        message: 'Lỗi khi lấy danh sách sản phẩm',
        error: error.message
      });
    }
  },

  // GET /api/products/:id - Lấy một sản phẩm theo ID
  findOne: async function (req, res) {
    try {
      const productId = req.param('id');
      const product = await Product.findOne({ id: productId });

      if (!product) {
        return res.notFound({
          success: false,
          message: 'Không tìm thấy sản phẩm'
        });
      }

      return res.ok({
        success: true,
        data: product,
        message: 'Lấy thông tin sản phẩm thành công'
      });
    } catch (error) {
      return res.serverError({
        success: false,
        message: 'Lỗi khi lấy thông tin sản phẩm',
        error: error.message
      });
    }
  },

  // POST /api/products - Tạo sản phẩm mới
  create: async function (req, res) {
    try {
      const { name, price, description, category, inStock } = req.body;

      // Validation
      if (!name || !price) {
        return res.badRequest({
          success: false,
          message: 'Tên sản phẩm và giá là bắt buộc'
        });
      }

      const newProduct = await Product.create({
        name,
        price: parseFloat(price),
        description,
        category,
        inStock: inStock !== undefined ? inStock : true
      }).fetch();

      return res.ok({
        success: true,
        data: newProduct,
        message: 'Tạo sản phẩm thành công'
      });
    } catch (error) {
      return res.serverError({
        success: false,
        message: 'Lỗi khi tạo sản phẩm',
        error: error.message
      });
    }
  },

  // PUT /api/products/:id - Cập nhật sản phẩm
  update: async function (req, res) {
    try {
      const productId = req.param('id');
      const { name, price, description, category, inStock } = req.body;

      const updatedProduct = await Product.updateOne({ id: productId })
        .set({
          name,
          price: price ? parseFloat(price) : undefined,
          description,
          category,
          inStock
        });

      if (!updatedProduct) {
        return res.notFound({
          success: false,
          message: 'Không tìm thấy sản phẩm để cập nhật'
        });
      }

      return res.ok({
        success: true,
        data: updatedProduct,
        message: 'Cập nhật sản phẩm thành công'
      });
    } catch (error) {
      return res.serverError({
        success: false,
        message: 'Lỗi khi cập nhật sản phẩm',
        error: error.message
      });
    }
  },

  // DELETE /api/products/:id - Xóa sản phẩm
  destroy: async function (req, res) {
    try {
      const productId = req.param('id');

      const deletedProduct = await Product.destroyOne({ id: productId });

      if (!deletedProduct) {
        return res.notFound({
          success: false,
          message: 'Không tìm thấy sản phẩm để xóa'
        });
      }

      return res.ok({
        success: true,
        message: 'Xóa sản phẩm thành công'
      });
    } catch (error) {
      return res.serverError({
        success: false,
        message: 'Lỗi khi xóa sản phẩm',
        error: error.message
      });
    }
  }
};
