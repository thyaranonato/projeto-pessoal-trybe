const rescue = require('express-rescue');
const Product = require('../services/ProductsService');

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const product = await Product.create(name, quantity);

  const newProduct = {
    id: product.insertId,
    name,
    quantity,
  };

  return res.status(201).json(newProduct);
});

const getAll = rescue(async (_req, res) => {
  const products = await Product.getAll();

  return res.status(200).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const [product] = await Product.getById(id);

  return res.status(200).json(product);
});

const updateById = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await Product.updateById(name, quantity, id);
  
  const productUpdated = {
    id: Number(id),
    name,
    quantity,
  };
  return res.status(200).json(productUpdated);
});

const deleteById = rescue(async (req, res) => {
  const { id } = req.params;
  const [productDeleted] = await Product.getById(id);
  
  if (productDeleted === undefined) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await Product.deleteById(id);
  return res.status(200).json(productDeleted);
});

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
