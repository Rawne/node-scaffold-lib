import { interfaces } from 'inversify-express-utils';
import { Controller, Get, Post, Put, Delete, getDocs, RequestParam, Request as invRequest, Response as InvResponse  } from 'inversify-express-doc';
import { injectable, inject } from 'inversify';
import { Response } from 'express';
import 'reflect-metadata';

@injectable()
@Controller('/default')
export default class DefaultController implements interfaces.Controller {

  @Get('/')
  public get(@invRequest() request: { user: any}, @InvResponse() res: Response) {
    res.status(200).json({ bla:'test'});
  }

}