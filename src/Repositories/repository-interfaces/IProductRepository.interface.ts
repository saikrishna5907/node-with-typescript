import { IBaseRepository } from "./IBaseRepository.internface";

export interface IProductRepository extends IBaseRepository {
  // In this extra props or methods which are present for only products but not a common methods like save which is in IBaseRepository

  getAllProductsInAnOrder: () => {}
}