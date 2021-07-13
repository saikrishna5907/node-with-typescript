import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpPut, request, requestBody, response } from "inversify-express-utils";
import { INVERSIFY_TYPES } from "../../config/inversify-di/di-types";
import { UpdateKitProductDTO } from "../../domain/DTO/KitProduct/updateKitProduct.dto";
import { KitProductDocument } from "../../domain/models/kitProduct/kit-product.model";
import { KitProductService } from "../../services/kit-product/kit-product.service";

@controller('/kitProducts')
export class KitProductsController {
  @inject(INVERSIFY_TYPES.KitProductService) private readonly kitProductService!: KitProductService;

  @httpGet('/')
  public async getAllKitProducts(@request() req: Request, @response() res: Response) {
    const kitProducts = await this.kitProductService.getAll();
    res.status(200).send(kitProducts);
  }
  @httpPost('/')
  public async createKitProduct(@requestBody() kitProduct: KitProductDocument, @response() res: Response) {
    console.log(kitProduct)
    res.status(201).send(await this.kitProductService.create(kitProduct))
  }
  @httpPut('/')
  public async updateKitProduct(@requestBody() kit: UpdateKitProductDTO, @response() res: Response) {
    const updateRes = await this.kitProductService.updateKitProduct(kit);
    res.status(200).send(updateRes);
  }
}