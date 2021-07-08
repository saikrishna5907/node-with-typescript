import MongoDbConnect from "../config/mongoDB/database";
import { IProductRepository } from "./repository-interfaces/IProductRepository.interface";
import mongodb from 'mongodb';
import { Product } from "../models/product/product";
import { injectable } from "inversify";
@injectable()
export class ProductRepository implements IProductRepository {

  public getAllProductsInAnOrder = async (): Promise<Product> => {
    // for now the logic is just returning one products
    const dbInstance = await MongoDbConnect.getDbInstance();
    return await dbInstance.collection('products').findOne({ _id: new mongodb.ObjectID('some id') });
  };


  public save = async (product: Product) => {
    const dbInstance = await MongoDbConnect.getDbInstance();
    const insertResult = await dbInstance.collection('products').insertOne(product);
  };

  public getAll = async (): Promise<Product[] | any> => {
    const dbInstance = await MongoDbConnect.getDbInstance();
    return dbInstance.collection('products').find();
  };

}