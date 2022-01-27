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

// Fonte: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/7798fbd5-d291-46a8-89cd-b7d9bdbd68eb/validacoes/35bdfb39-b17b-49b1-b391-e9bc67b9cf1e?use_case=side_bar
app.use((err, _req, res, _next) => {
  res.status(500).json({ error: err });
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
