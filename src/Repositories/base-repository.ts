import { injectable } from "inversify";
import { IBaseRepository } from "./repository-interfaces/IBaseRepository.internface";

@injectable()
export class BaseRespository<T> implements IBaseRepository<T> {
  public save = async (entity: T) => {
    //
  };
  // TODO change to return Promise<T> later
  public getAll = async (): Promise<any> => {
    //
  };

}