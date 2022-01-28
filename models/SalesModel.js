const connection = require('./connection');

const createId = async () => {
  const [salesId] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return salesId;
};

const createSalesProducts = async (arr) => {
  // Referência uso de query - várias inserções de elementos: https://www.npmjs.com/package/mysql2#using-promise-wrapper
  const [salesProduct] = await connection.query(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
    arr,
  );
  return salesProduct;
};

module.exports = {
  createId,
  createSalesProducts,
};
