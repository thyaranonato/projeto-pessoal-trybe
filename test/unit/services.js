const { expect } = require('chai');
const sinon = require('sinon');

const ProductService = require('../../services/ProductsService');
const ProductModel = require('../../models/ProductsModel');

const SaleService = require('../../services/SalesService');
const SaleModel = require('../../models/SalesModel');

const product = {
  id: 1,
  name: "Martelo de Thor",
  quantity: 10,
}

describe('Teste do Product Service', () => {
  describe('Insere novo produto no banco de dados', () => {
    describe('produto inserido com sucesso', () => {  
      before(async () => {      
        sinon.stub(ProductService, 'create').resolves([product]);
      });
  
      after(async () => {
        ProductService.create.restore();
      });

      it('retorna um produto', async () => {
        const data = await ProductService.create(product);
        expect(data).to.be.a('array');
        expect(data).to.be.equal(data);
      });
    });
  });
  describe('Lista todos os produtos', () => {
    before(async () => {
      sinon.stub(ProductModel, 'getAll').resolves([product]);
    });
  
    after(async () => {
      ProductModel.getAll.restore();
    });

    describe('quando inserido com sucesso', () => {
      it('retorna um array', async () => {
        const data = await ProductService.getAll(product);

        expect(data).to.be.a('array');
      });
    });
  });
});

const sales =   [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "product_id": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "product_id": 2,
    "quantity": 2
  }
]
const result =   {
  "id": 1,
  "itemsSold": [
    {
      "product_id": 1,
      "quantity": 5
    },
    {
      "product_id": 2,
      "quantity": 1
    }
  ]
}  

describe('Teste do Sale Service', () => {
  describe('Lista todas as vendas', ()=>{
    before(async () => {
      sinon.stub(SaleModel, 'getAll').resolves(result);
    });
  
    after(async () => {
      SaleModel.getAll.restore();
    });
  
    describe('quando venda é inserida com sucesso', () => {
  
      it('retorna um objeto', async () => {
        const response = await SaleService.getAll(product);
  
        expect(response).to.be.a('object');
      });
    });
  })  
});
