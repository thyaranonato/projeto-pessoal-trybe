const connection = require('./connection');

const create = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity)
  VALUES (?, ?)`;
  const [product] = await connection.execute(query, [name, quantity]);
  return product;
};

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return product;
};

module.exports = { 
  create,
  getAll,
  getById,
};
