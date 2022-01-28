const rescue = require('express-rescue');
const Sales = require('../services/SalesService');

const create = rescue(async (req, res) => {
  const arr = req.body;
  const salesId = await Sales.createId();

  const newArray = [];

  arr.forEach((element) => {
    newArray.push(salesId, element.product_id, element.quantity);
  });

  await Sales.createSalesProducts(newArray);

  const newSalesProduct = {
    id: salesId,
    itemsSold: arr,
  };

  return res.status(201).json(newSalesProduct);
});

module.exports = {
  create,
};
