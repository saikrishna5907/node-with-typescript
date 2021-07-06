import MongoDbConnect from "../config/database";
import { IProductRepository } from "./repository-interfaces/IProductRepository.interface";
import mongodb from 'mongodb';
import { Product } from "../models/product/product";
export class ProductRepository implements IProductRepository {

  public getAllProductsInAnOrder = async (): Promise<Product[]> => {
    // for now the logic is just returning one products
    const dbInstance = await MongoDbConnect.getDbInstance();
    return await dbInstance.collection('products').findOne({ _id: new mongodb.ObjectID('some id') });
  };


  public save = async (product: Product) => {
    const dbInstance = await MongoDbConnect.getDbInstance();
    const insertResult = await dbInstance.collection('products').insertOne(product);
  };

}