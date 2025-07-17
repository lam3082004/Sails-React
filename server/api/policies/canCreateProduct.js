module.exports = async function (req, res, proceed) {
  req.options.permission = 'product.create';
  return sails.helpers.policy.hasPermission.with({ req, res, proceed });
};
