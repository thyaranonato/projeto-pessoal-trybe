require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { nameValidation, quantityValidation, 
  idValidation } = require('./services/middlewares/ProductsValidation');
const Product = require('./controllers/ProductsControler');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  res.status(500);
  res.json({ error: err });
});

app.route('/products')
.get(rescue(Product.getAll))
.post(nameValidation, quantityValidation, rescue(Product.create));

app.route('/products/:id')
  .get(rescue(idValidation), rescue(Product.getById))
  .put(rescue(Product.getById));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
