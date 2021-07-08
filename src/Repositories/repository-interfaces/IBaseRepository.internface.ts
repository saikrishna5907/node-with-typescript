import { Product } from "../../models/product/product";

export interface IBaseRepository<T> {
  save: (entity: T) => {}
  getAll: () => Promise<T[] | any>
}