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

module.exports = {
  productIdValidation,
  quantitySalesValidation,
}; 
