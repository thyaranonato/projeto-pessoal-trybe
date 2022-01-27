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

const updateById = async (name, quantity, id) => {
  const [productUpdate] = await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
  return productUpdate;
};

const deleteById = async (id) => {
  const [productDeleted] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return productDeleted;
};

module.exports = { 
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
