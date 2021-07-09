import { inject, injectable } from "inversify";
import TYPES from "../../config/inversify-di/di-types";
import { IProductService } from "../../models/product/Iproduct-service.interface";
import { Product } from "../../models/product/product";
import { ProductRepository } from "../../Repositories/product.repository";

@injectable()
export class ProductService implements IProductService {
  constructor(@inject(TYPES.ProductRepository) private readonly _productRepo: ProductRepository) {

  }
  getAllProductsInAnOrder = (): Promise<Product> => {
    return this._productRepo.getAllProductsInAnOrder();
  };


  public save = async (product: Product): Promise<void> => {
    if (!product) {
      throw new Error('Product is required...!');
    }
    await this._productRepo.save(product);
  }
  public getAll = async (): Promise<any> => {
    return await this._productRepo.getAll();
  };

}