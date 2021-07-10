import { injectable, unmanaged } from "inversify";
import { EnforceDocument, Model, Types } from "mongoose";
import { IBaseRepository } from "./repository-interfaces/IBaseRepository.internface";

@injectable()
export class BaseRespository<T> implements IBaseRepository<T> {
  private mongooseModel: Model<T>;

  constructor(@unmanaged() model: Model<T>) {
    this.mongooseModel = model;
  }
  public getById = async (id: string): Promise<EnforceDocument<T, {}>> => {
    try {
      const responseFromDB = await this.mongooseModel.findById(new Types.ObjectId(id));
      if (responseFromDB) {
        return responseFromDB;
      } else {
        throw new Error(`Item not found for the given ID ${id}`);
      }
    } catch (err) {
      console.log(err);
      throw new Error('Find by ID Unsuccessfull...!')
    }
  };
  public create = async (item: T): Promise<EnforceDocument<T, {}>> => {
    try {
      const responseFromDB = await this.mongooseModel.create(item);
      return responseFromDB;
    } catch (err) {
      console.log(err);
      throw new Error('Create Unsuccessfull...!')
    }
  };


  // TODO change to return Promise<T> later
  public getAll = async (): Promise<T[]> => {
    try {
      const responseFromDB = await this.mongooseModel.find({});
      return responseFromDB;
    } catch (error) {
      throw new Error('Could not get all items');
    }
  }
}