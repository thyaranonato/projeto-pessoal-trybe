const { expect } = require('chai');
const sinon = require('sinon');

const ProductService = require('../../services/ProductsService');
const ProductController = require('../../controllers/ProductsControler');

describe('Teste do Product Controller', () => {
  describe('Ao chamar o controller de create', () => {
    describe('quando é inserido com sucesso', () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = { "name": 'Example Product', "quantity": 10 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'create')
        .resolves(true);
      })

      after(async () => {
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
