import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { PARAMETER_TYPE } from "inversify-express-utils/dts/constants";
import { params } from "inversify-express-utils/dts/decorators";
import TYPES from "../../config/inversify-di/di-types";
import { Product } from "../../models/product/product";
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
  @httpPost('/')
  public async addProduct(@params(PARAMETER_TYPE.BODY) product: Product, @response() res: Response) {
    console.log(product)
    product.description = 'Product discription';
    product.imageUrl = 'sample image url';
    product.price = 45;
    product.title = "Sai design patterns";
    this.productService.save():
  }
}