module.exports = async function (req, res, proceed) {
  req.options.permission = 'product.update';
  return sails.helpers.policy.hasPermission.with({ req, res, proceed });
};
