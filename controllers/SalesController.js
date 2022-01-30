const Sales = require('../services/SalesService');

const create = async (req, res) => {
  const arr = req.body;
  const salesId = await Sales.create();

  const newArray = [];

  arr.forEach((element) => {
    newArray.push([salesId, element.product_id, element.quantity]);
  });

  await Sales.createSalesProducts(newArray);

  const newSalesProduct = {
    id: salesId,
    itemsSold: arr,
  };

  return res.status(201).json(newSalesProduct);
};

const getAll = async (_req, res) => {
  const sales = await Sales.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await Sales.getById(id);

  return res.status(200).json(sales);
};

const update = async (req, res) => {
  const { id } = req.params;
  const sales = await Sales.update(id, req.body);

  return res.status(200).json(sales);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
