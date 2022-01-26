const Product = require('../ProductsService');

const nameValidation = async (req, res, next) => {
  const { name } = req.body;
  const products = await Product.getAll();
  const productExists = products.some((product) => product.name === name);

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (typeof name !== 'string' || name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  if (productExists) {
    res.status(409).json({ message: 'Product already exists' });
  }
  return next();
};

const quantityValidation = async (req, res, next) => {
  const { quantity } = req.body;

  if (typeof quantity === 'string' || quantity < 0 || quantity === 0) {
    return res.status(422)
    .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};

const idValidation = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.getById(id);

  if (product.length < 1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return next();
};

module.exports = {
  nameValidation,
  quantityValidation,
  idValidation,
};
