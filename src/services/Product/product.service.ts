import { Product } from "../../models/product/product";
import { ProductRepository } from "../../Repositories/Product.repository";

export class ProductService {
  constructor(private readonly _productRepo: ProductRepository) {

  }

  public save = async (product: Product): Promise<void> => {
    if (!product) {
      throw new Error('Product is required...!');
    }
    await this._productRepo.save(product);
  }

}