import { inject, injectable, named } from "inversify";
import { INVERSIFY_TYPES } from "../../config/inversify-di/di-types";
import { IProductService } from "../../models/product/Iproduct-service.interface";
import { ProductDocument } from "../../models/product/product";

import { ProductRepository } from "../../Repositories/product.repository";
import { BaseService } from "../Base/base.service";

@injectable()
export class ProductService extends BaseService<ProductDocument> implements IProductService {

  constructor(@inject(INVERSIFY_TYPES.ProductRepository) private readonly _productRepo: ProductRepository) {
    super(_productRepo)
  }
  // public getById = async (id: string): Promise<ProductDocument> => {
  //   if (!id) {
  //     throw new Error('ID is not found to find Product');
  //   }
  //   return await this._productRepo.getById(id);
  // };
  public getAllProductsInAnOrder = (): Promise<ProductDocument> => {
    return this._productRepo.getAllProductsInAnOrder();
  };
  // public create = async (product: ProductDocument): Promise<ProductDocument> => {
  //   if (!product) {
  //     throw new Error('Product is required...!');
  //   }
  //   return await this._productRepo.create(product);
  // };
  // public getAll = async (): Promise<ProductDocument[]> => {
  //   return await this._productRepo.getAll();
  // };


}