import * as Chai from 'chai';
import Default from '../src/default';

const expect = Chai.expect;
describe('Default test', () => {
  let defaultTest: Default;
  before(() => {
    defaultTest = new Default(2, 2);
   });
  describe('get', () => {
    it('should return 4', () => {
      expect(defaultTest.result).to.equal(4);
    });
  });
});
