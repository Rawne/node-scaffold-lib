import { Container } from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';
import { DocController } from 'inversify-express-doc';
import DefaultController from './default_controller';
import TYPES from './types';
export const kernel = new Container();


kernel.bind<interfaces.Controller>(TYPE.Controller).to(DefaultController).whenTargetNamed('DefaultController');
kernel.bind<interfaces.Controller>(TYPE.Controller).to(DocController)
.whenTargetNamed('DocController');

