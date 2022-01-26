const Product = require('../models/ProductsModel');

const create = async (name, quantity) => {
  const product = await Product.create(name, quantity);
  return product;
};

const getAll = async () => {
  const products = await Product.getAll();

  return products.map((product) => product);
};

const getById = async (id) => {
  const numberId = Number(id);

  // Fonte - Number.isInteger: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
  if (!Number.isInteger(numberId)) return false;

  const product = await Product.getById(id);
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
};
