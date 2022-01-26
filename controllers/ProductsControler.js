const Product = require('../services/ProductsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await Product.getAll();

  await Product.create(name, quantity);
  const newProduct = {
    id: products.length + 1,
    name,
    quantity,
  };

  res.status(201).json(newProduct);
};

const getAll = async (_req, res) => {
  const products = await Product.getAll();

  res.status(200).json(products);
};

module.exports = {
  create,
  getAll,
};
