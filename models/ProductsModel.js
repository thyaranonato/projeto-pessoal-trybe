const connection = require('./connection');

const create = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity)
  VALUES (?, ?)`;
  const [product] = await connection.execute(query, [name, quantity]);
  return product;
};

const getAll = async () => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return product;
};

module.exports = { 
  create,
  getAll,
};
