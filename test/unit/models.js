const { expect } = require('chai');
const sinon = require('sinon');
const { products } = require('./mocks');
const connection = require('../../models/connection');

const ProductModel = require('../../models/ProductsModel');
const SaleModel = require('../../models/SalesModel');

describe('Teste do Product Model', () => {
  describe('Insere novo produto no banco de dados', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    describe('produto inserido com sucesso', () => {
      it('retorna um objeto', async () => {
        const data = await ProductModel.create(products);
        expect(data).to.be.a('object');
      });

      it('objeto possui um "insertId" do produto inserido', async () => {
        const data = await ProductModel.create(products);
        expect(data).to.have.a.property('insertId');
      });
    });
  });

  describe('Lista todos os produtos', () => {
    const result = [products]
    before(async () => {
  
      sinon.stub(connection, 'execute').resolves([result]);
    });
  
    after(async () => {
      connection.execute.restore();
    });
  
    describe('quando inserido com sucesso', () => {
      it('retorna um objeto', async () => {
        const data = await ProductModel.getAll(products);
  
        expect(data).to.be.a('array')
      });
  
      it('objeto possui novo produto', async () => {
        const data = await ProductModel.getAll(products);
  
        expect(data).to.have.equal(result);
      });
    });
  })  
});

describe('Teste do Sale Model', () => {
  describe('Insere novo produto no banco de dados', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{ id: 1 }]);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    describe('produto inserido com sucesso', () => {
      const sales = [{
        "product_id": 1,
        "quantity": 3
      }]

      it('retorna um objeto', async () => {
        const data = await SaleModel.createId(sales);
        expect(data).to.be.a('object');
      });

      it('objeto possui um "id" da nova venda', async () => {
        const data = await SaleModel.createId(sales);
        expect(data).to.have.a.property('id');
      });
    });
  });

  describe('Lista todas as vendas', () => {
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
    const result =   [
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
    before(async () => {  
      sinon.stub(connection, 'execute').resolves([result]);
    });
  
    after(async () => {
      connection.execute.restore();
    });
  
    describe('quando inserida com sucesso', () => {
  
      it('retorna um array de objeto', async () => {
        const response = await SaleModel.getAll(sales);
  
        expect(response).to.be.a('array')
      });
  
      it('objeto possui nova venda inserida', async () => {
        const data = await SaleModel.getAll(sales);
  
        expect(data).to.have.equal(result);
      });
    });
  })
});
