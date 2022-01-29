const sinon = require("sinon");
const { expect } = require("chai");

const ProductService = require("../../services/ProductsService");
const ProductController = require("../../controllers/ProductsControler");
const ProductValidation = require('../../services/middlewares/ProductsValidation');

const SaleService = require('../../services/SalesService');
const SaleController = require('../../controllers/SalesController');

describe('Teste do Product Controller', () => {
  describe('Ao chamar o controller de create', () => {
    describe('quando o payload informado não é válido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(ProductService, 'create').resolves({ 
          code: 400,
          message: '"name" is required',
        })
      })

      after(() => {
        ProductService.create.restore();
      });
  
      it('é chamado o status com o código 400', async () => {
        await ProductValidation.nameValidation(request, response);
  
        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem "name" is required"', async () => {
        await ProductValidation.nameValidation(request, response);
  
        expect(response.json.calledWith('"name" is required')).to.be.equal(true);
      });
    });
  
    describe('quando é inserido com sucesso', () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = { "name": "Example Product", "quantity": 10 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

  
        sinon.stub(ProductService, 'create')
        .resolves(true);
      })

      after(() => {
        ProductService.create.restore();
      });
  
      it('é chamado o status com o código 201', async () => {
        await ProductController.create(request, response);
  
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('é chamado o json com o objeto', async () => {
        await ProductController.create(request, response);
  
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });
});

describe('Teste do Sale Controller', () => {
  describe('Ao chamar o controller de create', () => {
    describe('quando o payload informado não é válido', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SaleService, 'create').resolves({ code: 400, 
          message: '"product_id" is required',
        })

      after(() => {
        SaleService.create.restore();
      });
  
  
      it('é chamado o status com o código 400', async () => {
        await SaleController.create(request, response);
  
        expect(response.status.calledWith(400)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem "product_id" is required"', async () => {
        await SaleController.create(request, response);
  
        expect(response.json.calledWith('"product_id" is required')).to.be.equal(true);
      });
    });
  
    describe('quando é inserido com sucesso', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = [
          {
            product_id: 1,
            quantity: 2,
          }
        ];
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SaleService, 'create').resolves(  
          {
          "id": 1,
          "itemsSold": [
            {
              "product_id": 1,
              "quantity": 2
            }
          ]
        });
      })

      after(() => {
        SaleService.create.restore();
      });
  
      it('é chamado o status com o código 201', async () => {
        await SaleController.create(request, response);
  
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('é chamado o json com o objeto', async () => {
        await SaleController.create(request, response);
  
        expect(response.json.calledWith('object')).to.be.equal(true);
      });
    });
  });
  });
});
