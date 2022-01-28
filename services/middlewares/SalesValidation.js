const Sales = require('../SalesService');

const productIdValidation = (req, res, next) => {
  const arr = req.body;

  arr.forEach((element) => {
    if (!element.product_id) {
      return res.status(400).json({ message: '"product_id" is required' });
    }
  });
  
  return next();
};

const quantitySalesValidation = (req, res, next) => {
  const arr = req.body;

  arr.forEach((element) => {
    if (typeof element.quantity === 'string' || element.quantity <= 0) {
      return res
      .status(422).json({ message: '"quantity" must be a number larger than or equal to 1' });
    }

    if (!element.quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  });

  return next();
};

const idSalesValidation = async (req, res, next) => {
  const { id } = req.params;

  const salesId = await Sales.getById(id);
  if (salesId < 1) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return next();
};

module.exports = {
  productIdValidation,
  quantitySalesValidation,
  idSalesValidation,
}; 
