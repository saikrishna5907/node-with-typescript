import { inject, injectable, named } from "inversify";
import { EnforceDocument } from "mongoose";
import { INVERSIFY_TYPES } from "../../config/inversify-di/di-types";
import { BaseRespository } from "../../Repositories/base-repository";
import { ProductRepository } from "../../Repositories/product.repository";
import { IBaseRepository } from "../../Repositories/repository-interfaces/IBaseRepository.internface";
import { IBaseService } from "./base.service.interface";

// T is the mongoose document
// R is the repository to use
// I is the inversify TYPES we defined
@injectable()
export class BaseService<T> implements IBaseService<T> {
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

}