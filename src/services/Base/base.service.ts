import MongoDbConnect from "../../config/mongoDB/database";
import { IBaseService } from "./base.service.interface";

export class BaseService<T> implements IBaseService<T> {

  public async save(value: T): Promise<void> {
    const dbInstance = await MongoDbConnect.getDbInstance();
    const collectionName = (typeof value);
    const insertResult = await dbInstance.collection(collectionName).insertOne(value);
    console.log(insertResult);
  }
  public async fetchAll() {
    const dbInstance = await MongoDbConnect.getDbInstance();
    return dbInstance.collection('product').find();
  }
}