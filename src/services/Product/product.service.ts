import { inject, injectable, named } from "inversify";
import { INVERSIFY_TYPES } from "../../config/inversify-di/di-types";
import { UpdateProductDTO } from "../../DTO/update-product.dto";
import { IProductService } from "../../models/product/Iproduct-service.interface";
import { ProductDocument } from "../../models/product/product";

import { ProductRepository } from "../../Repositories/product.repository";
import { BaseService } from "../Base/base.service";

@injectable()
export class ProductService extends BaseService<ProductDocument> implements IProductService {

  constructor(@inject(INVERSIFY_TYPES.ProductRepository) private readonly _productRepo: ProductRepository) {
    super(_productRepo)
  }
  public getAllProductsInAnOrder = (): Promise<ProductDocument> => {
    return this._productRepo.getAllProductsInAnOrder();
  };
  public updateProduct = async (item: UpdateProductDTO): Promise<ProductDocument> => {
    try {
      const product = await this._productRepo.getById(item._id);
      if (!product) {
        throw new Error('Updating Product Not Found...!');
      }
      product.description = item.description;
      product.displayName = item.displayName;
      product.productName = item.productName;
      product.stockOnhand = item.stockOnhand;
      product.imageUrl = item.imageUrl;
      product.price = item.price;
      product.status = item.status;
      return this._productRepo.update(product);
    } catch (err) {
      throw err(err);
    }
  };

}