import { Request, Response } from "express";
import { controller, httpGet, request, response } from "inversify-express-utils";

@controller('/order')
export class OrderController {

  @httpGet('/')
  public getOrders(@request() req: Request, @response() res: Response): void {
    res.send('I am orders page')
  }
}