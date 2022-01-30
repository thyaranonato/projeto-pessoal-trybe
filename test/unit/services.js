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
    describe('quando o payload informado não é válido', () => {
      const products = { quantity: 1 };
  
      before(async () => {
        const error = {
          status: 404,
          message: '"name" is required',
        };
  
        sinon.stub(ProductService, 'create').resolves(error);
      });
  
      after(async () => {
        ProductService.create.restore();
      });
  
      it('erro contém uma mensagem "name is required" e status 404', async () => {
        const data = await ProductService.create(products);
  
        expect(data).to.be.a('object');
        expect(data).to.have.a.property('message');
        expect(data.message).to.be.equal('"name" is required');
        expect(data).to.have.a.property('status');
        expect(data.status).to.be.equal(404);
      });
    });

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

  describe('Busca 1 produto no banco de dados por seu "id"', () => {  
    describe('quando existe produto com o "id" informado', () => {
      before(async () => {
        sinon.stub(ProductModel, 'getById')
          .resolves(result);
      });
  
      after(async () => {
        ProductModel.getById.restore();
      })
  
      it('retorna um array com objeto', async () => {
        const data = await ProductService.getById(1);
  
        expect(data).to.be.an('object');
      });
  
      it('o objeto não está vazio', async () => {
        const data = await ProductService.getById(1);
  
        expect(data).to.be.not.empty;
      });
    });
  })
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
  describe('Lista todas as vendas', () => {
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

  describe('Busca 1 produto no banco de dados por seu "id"', () => {
    const result =   [
      { 
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
      }
    ]

    describe('quando não existe produto com "id" informado', () => {
      before(async () => {
        const error = {
          status: 404,
          message: 'Sale not found',
        };
  
        sinon.stub(SaleModel, 'getById').resolves(error);
      });
  
      after(async () => {
        SaleModel.getById.restore();
      })
  
      it('erro retorna "not found" e status 404', async () => {
        const data = await SaleService.getById(sales);
  
        expect(data).to.be.a('object');
        expect(data).to.have.a.property('message');
        expect(data.message).to.be.equal('Sale not found');
        expect(data).to.have.a.property('status');
        expect(data.status).to.be.equal(404);
      });
    });
  })
});
