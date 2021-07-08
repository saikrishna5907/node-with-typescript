import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, request, response } from "inversify-express-utils";
import TYPES from "../../config/inversify-di/di-types";
import { ProductService } from "../../services/Product/product.service";

@controller('/products')
export class ProductController {
  constructor(@inject(TYPES.ProductService) private readonly productService: ProductService) { }
  @httpGet('/')
  public async getAllProducts(@request() req: Request, @response() res: Response) {
    const allProducts = await this.productService.getAll();
    console.log(allProducts);
    res.send('I am prroduct page');
  }
}