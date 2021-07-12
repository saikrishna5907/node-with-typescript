import { ProductDocument } from "../models/product/product";
import { injectable } from "inversify";
import { BaseRespository } from "./base-repository";
import productSchema from '../models/product/product';
import { IProductRepository } from "./repository-interfaces/IProductRepository.interface";
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