import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, request, requestBody, requestParam, response } from "inversify-express-utils";
import TYPES from "../../config/inversify-di/di-types";
import { ProductDocument } from "../../models/product/product";
import { ProductService } from "../../services/Product/product.service";

@controller('/products')
export class ProductController {
  @inject(TYPES.ProductService) private readonly productService!: ProductService
  @httpGet('/')
  public async getAllProducts(@request() req: Request, @response() res: Response) {
    const allProducts = await this.productService.getAll();
    res.send(allProducts);
  }
  @httpPost('/')
  public async addProduct(@requestBody() product: ProductDocument, @response() res: Response) {
    const createdProduct = await this.productService.create(product);
    res.status(201).send(createdProduct);
  }
  @httpGet('/:id')
  public async getProductById(@requestParam("id") id: string, @response() res: Response) {
    return await this.productService.getById(id);
  }
}