const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { nameValidation, quantityValidation } = require('./services/middlewares/ProductsValidation');
const Product = require('./controllers/ProductsControler');

const app = express();

app.use(bodyParser.json());

require('dotenv').config();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products')
  .get(rescue(Product.getAll))
  .post(nameValidation, quantityValidation, rescue(Product.create));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
