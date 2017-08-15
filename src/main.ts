import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as dotEnv from 'dotenv';
import * as bodyParser from 'body-parser';


// Load config setings
dotEnv.config();

// Load dependency injection bindings
import { kernel } from './inversify.config';

// start the server
let server = new InversifyExpressServer(kernel);
server.setConfig((app: any) => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(function(req: any, res: any, next: any) {
    res.header('Content-Type', 'application/json');
    next();
  });
  app.get('/', (req: any, res: any) => res.redirect('/doc'));
});
const port = process.env['PORT'] || 8080;

let app = server.build().listen(port);
console.log('version:' + process.env.npm_package_version);
console.log('started on: ', port);



