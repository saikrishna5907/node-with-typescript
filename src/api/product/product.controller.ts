import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpPut, request, requestBody, requestParam, response } from "inversify-express-utils";
import { INVERSIFY_TYPES } from "../../config/inversify-di/di-types";
import { UpdateProductDTO } from "../../domain/DTO/product/update-product.dto";
import { ProductDocument } from "../../domain/models/product/product";
import { ProductService } from "../../services/product/product.service";

@controller('/products')
export class ProductController {
  @inject(INVERSIFY_TYPES.ProductService) private readonly productService!: ProductService
  @httpGet('/')
  public async getAllProducts(@request() req: Request, @response() res: Response) {
    const allProducts = await this.productService.getAllProducts();
    res.send(allProducts);
  }
  @httpPost('/')
  public async addProduct(@requestBody() product: ProductDocument, @response() res: Response) {
    const createdProduct = await this.productService.create(product);
    res.status(201).send(createdProduct);
  }
  @httpGet('/:id')
  public async getProductById(@requestParam("id") id: string, @response() res: Response) {
    res.status(200).send(await this.productService.getProductById(id));
  }
  @httpPut('/')
  public async updateProduct(@requestBody() product: UpdateProductDTO, @response() res: Response) {
    const updateRes = await this.productService.updateProduct(product);
    res.status(200).send(updateRes);
  }
}