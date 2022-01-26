const Product = require('../models/ProductsModel');

const create = async (name, quantity) => {
  await Product.create(name, quantity);
  return true;
};

const getAll = async () => {
  const products = await Product.getAll();

  return products.map((product) => product);
};

module.exports = {
  create,
  getAll,
};
