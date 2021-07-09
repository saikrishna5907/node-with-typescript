import MongoDbConnect from "../config/mongoDB/database";
import { IProductRepository } from "./repository-interfaces/IProductRepository.interface";
import { Product } from "../models/product/product";
import { injectable } from "inversify";
import { BaseRespository } from "./base-repository";
import { IProduct } from "../models/product/Iproduct.interface";
@injectable()
export class ProductRepository extends BaseRespository<Product> implements IProductRepository {


  public getAllProductsInAnOrder = async (): Promise<Product> => {
    const dbInstance = await MongoDbConnect.getDbInstance();
    return new Product({} as IProduct);
    // for now the logic is just returning one products
    // return await dbInstance.collection('products').findOne({ _id: new mongodb.ObjectID('some id') });
  };


  public save = async (product: Product) => {
    const dbInstance = await MongoDbConnect.getDbInstance();

    // const insertResult = await dbInstance.collection('products').insertOne(product);
  };

  public getAll = async (): Promise<Product[] | any> => {
    const dbInstance = await MongoDbConnect.getDbInstance();
    // return dbInstance.collection('products').find();
  };

}