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

  describe('Listar todos os produtos', () => {
    const result = [products]
    before(async () => {
  
      sinon.stub(connection, 'execute').resolves([result]);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    describe("lista os produtos", () => {
      it('retorna um array', async () => {
        const data = await ProductModel.getAll();
  
        expect(data).to.be.a('array');
        expect(data).to.be.equal(result);
        expect(data).to.be.lengthOf(1);
      });
    });
  })

  describe('Busca 1 produto no banco de dados pelo seu "id"', () => {  
    describe('Quando o "id" não é válido', () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      })

      after(async () => {
        connection.execute.restore();
      });

      it('retorna um array vazio', async () => {
        const data = await ProductModel.getById(4);
        expect(data).to.be.a('array');
        expect(data).to.have.length(0);
      })
    })

    describe('quando "id" informado é válido', () => {
      const product = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10,
      }
  
      before(async () => {
        sinon.stub(ProductModel, 'getById')
          .resolves(product);
      });
  
      after(async () => {
        ProductModel.getById.restore();
      })
  
      it('retorna um objeto', async () => {
        const data = await ProductModel.getById(1);
  
        expect(data).to.be.an('object');
      });
  
      it('o objeto não está vazio', async () => {
        const data = await ProductModel.getById(1);
  
        expect(data).to.be.not.empty;
      });
  
      it('objeto possui propriedades: "id", "name", "quantity"', async () => {
        const data = await ProductModel.getById(1);
  
        expect(data).to.include.all.keys('id', 'name', 'quantity');
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

  describe('Busca vendas no banco de dados por seu "id"', () => {  
    describe('quando existe venda com "id" informado', () => {
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
  
      before(async () => {
        sinon.stub(SaleModel, 'getById')
          .resolves(sales);
      });
  
      after(async () => {
        SaleModel.getById.restore();
      })
  
      it('retorna um objeto', async () => {
        const response = await SaleModel.getById(1);
  
        expect(response).to.be.an('array');
      });
  
      it('o objeto não está vazio', async () => {
        const response = await SaleModel.getById(1);
  
        expect(response).to.be.not.empty;
      });
    });
  })
});
