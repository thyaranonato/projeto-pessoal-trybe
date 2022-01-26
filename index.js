require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { nameValidation, quantityValidation, 
  idValidation } = require('./services/middlewares/ProductsValidation');
const Product = require('./controllers/ProductsControler');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', nameValidation, quantityValidation, Product.create);

app.get('/products/:id', idValidation, Product.getById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
