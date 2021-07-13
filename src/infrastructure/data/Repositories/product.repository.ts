import { ProductDocument } from "../../../domain/models/product/product";
import { injectable } from "inversify";
import { BaseRespository } from "./base-repository";
import productSchema from '../../../domain/models/product/product';
import { IProductRepository } from "../../../domain/Interfaces/repository-interfaces/IProductRepository.interface";
@injectable()
export class ProductRepository extends BaseRespository<ProductDocument> implements IProductRepository {
  constructor() {
    super(productSchema)
  }
  public getAllProductsInAnOrder = async (): Promise<ProductDocument> => {
    return {} as ProductDocument;
    // for now the logic is just returning one products
    // return await dbInstance.collection('products').findOne({ _id: new mongodb.ObjectID('some id') });
  };
}