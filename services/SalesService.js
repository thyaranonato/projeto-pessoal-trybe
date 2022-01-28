const Sales = require('../models/SalesModel');

const createId = async () => {
  const salesId = await Sales.createId();
  return salesId.insertId;
};

const createSalesProducts = async (arr) => {
  const salesProduct = await Sales.createSalesProducts(arr);

  return salesProduct;
};

module.exports = {
  createId,
  createSalesProducts,
};
