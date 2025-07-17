module.exports = async function (req, res, proceed) {
  req.options.permission = 'product.delete';
  return sails.helpers.policy.hasPermission.with({ req, res, proceed });
};
