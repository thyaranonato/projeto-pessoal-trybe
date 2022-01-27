const Product = require('../services/ProductsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await Product.create(name, quantity);

  const newProduct = {
    id: product.insertId,
    name,
    quantity,
  };

  return res.status(201).json(newProduct);
};

const getAll = async (_req, res) => {
  const products = await Product.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const [product] = await Product.getById(id);

  return res.status(200).json(product);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await Product.updateById(name, quantity, id);
  
  const productUpdated = {
    id: Number(id),
    name,
    quantity,
  };
  return res.status(200).json(productUpdated);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
};
