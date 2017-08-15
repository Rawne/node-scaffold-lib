import 'reflect-metadata';
import * as request from 'supertest';
import * as Chai from 'chai';
import * as express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { kernel } from '../src/inversify.config';

const expect = Chai.expect;
describe('Default test', () => {
  let app: express.Application;
  before(() => {
    // start the server
    let server = new InversifyExpressServer(kernel);
    app = server.build();
   });
  describe('get', () => {
    it('should return "test"', (done: any) => {
      request(app)
      .get('/default')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).then((result) => {
        expect(result.body.bla).to.equal('test');
        done();
      }).catch(done);
    });
  });
});
