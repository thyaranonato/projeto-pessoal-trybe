const Sales = require('../SalesService');

const productIdValidation = (req, res, next) => {
  const arr = req.body;
  const productDefault = arr.some((element) => element.product_id === undefined);

  if (productDefault) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  
  return next();
};

const quantitySalesValidation = (req, res, next) => {
  const arr = req.body;
  const quantityDefault = arr.some((element) => element.quantity === undefined);
  const quantityValidation = arr
    .some((element) => element.quantity <= 0 || typeof element.quantity !== 'number');

  if (quantityDefault) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  
  if (quantityValidation) {
    return res
      .status(422).json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

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
