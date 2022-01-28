const connection = require('./connection');

const createId = async () => {
  const [salesId] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return salesId;
};

const createSalesProducts = async (arr) => {
  // Referência uso de query - várias inserções de elementos: https://www.npmjs.com/package/mysql2#using-promise-wrapper
  // Com execute estava quebrando
  const [salesProduct] = await connection.query(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?', 
    [arr],
  );
  return salesProduct;
};

const getAll = async () => {
  const query = `
  SELECT sp.sale_id as saleId, s.date,
  sp.product_id, sp.quantity
  FROM StoreManager.sales_products as sp
  INNER JOIN StoreManager.sales as s
  ON sp.sale_id = s.id`;

  const [sales] = await connection.execute(query);
  return sales;
};

const getById = async (id) => {
  const query = `
  SELECT s.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products as sp
  INNER JOIN StoreManager.sales as s
  ON sp.sale_id = s.id
  WHERE s.id = ?`;
  const [sales] = await connection.execute(query, [id]);

  return sales;
};

module.exports = {
  createId,
  createSalesProducts,
  getAll,
  getById,
};
