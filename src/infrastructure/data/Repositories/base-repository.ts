import { injectable, unmanaged } from "inversify";
import { EnforceDocument, Model, Types, Document } from "mongoose";
import { IBaseRepository } from "../../../domain/Interfaces/repository-interfaces/IBaseRepository.internface";

@injectable()
export class BaseRespository<T extends Document> implements IBaseRepository<T> {
  private mongooseModel: Model<T>;

  constructor(@unmanaged() model: Model<T>,) {
    this.mongooseModel = model;
  }

  public getById = async (id: string): Promise<EnforceDocument<T, {}>> => {
    if (!id) {
      throw new Error('No Id provided to get document...!');
    }
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
  public update = async (item: T): Promise<T> => {
    try {
      const responseFromDB = await item.save();
      if (responseFromDB) {
        return responseFromDB;
      } else {
        throw new Error('The item which is to update is not found...!');
      }
    } catch (err) {
      console.log(err);
      throw new Error('Update Unsuccessfull...!')
    }
  };
}