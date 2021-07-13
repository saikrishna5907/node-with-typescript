import { injectable } from "inversify";
import { EnforceDocument, Document } from "mongoose";
import { IBaseRepository } from "../../domain/Interfaces/repository-interfaces/IBaseRepository.internface";
import { IBaseService } from "../../domain/Interfaces/service-interfaces/Ibase.service.interface";

// T is the mongoose document
// R is the repository to use
// I is the inversify TYPES we defined
@injectable()
export class BaseService<T extends Document> implements IBaseService<T> {
  private readonly repository: IBaseRepository<T>
  constructor(repo: IBaseRepository<T>) {
    this.repository = repo;
  }
  public getById = async (id: string): Promise<T> => {
    if (!id) {
      throw new Error('ID is not found to find Product');
    }
    return await this.repository.getById(id);
  };
  public create = async (product: T): Promise<EnforceDocument<T, {}>> => {
    if (!product) {
      throw new Error('Product is required...!');
    }
    return await this.repository.create(product);
  };
  public getAll = async (): Promise<T[]> => {
    return await this.repository.getAll();
  };
  public update = async (item: T): Promise<T> => {
    try {
      if (!item) {
        throw new Error('Product is required to Update...!');
      }
      if (!item._id) {
        throw new Error('Id Not found');
      }

      return await this.repository.update(item);
    } catch (err) {
      console.log('-----------Update Failed------------');
      throw new Error(err);
    }

  };
}