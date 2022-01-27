require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { nameValidation, quantityValidation, 
  idValidation, updateValidation } = require('./services/middlewares/ProductsValidation');
const Product = require('./controllers/ProductsControler');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products')
  .get(rescue(Product.getAll))
  .post(nameValidation, quantityValidation, rescue(Product.create));

app.route('/products/:id')
  .get(rescue(idValidation), rescue(Product.getById))
  .put(updateValidation, quantityValidation, idValidation, rescue(Product.updateById));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
