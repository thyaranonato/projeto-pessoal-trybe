const Sales = require('../models/SalesModel');

const createId = async () => {
  const salesId = await Sales.createId();
  return salesId.insertId;
};

const createSalesProducts = async (arr) => {
  const salesProduct = await Sales.createSalesProducts(arr);

  return salesProduct;
};

const getAll = async () => {
  const sales = await Sales.getAll();
  return sales;
};

const getById = async (id) => {
  const sales = await Sales.getById(id);

  return sales;
};

module.exports = {
  createId,
  createSalesProducts,
  getAll,
  getById,
};
