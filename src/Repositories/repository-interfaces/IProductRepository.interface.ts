import { Product, ProductDocument } from "../../models/product/product";
import { IBaseRepository } from "./IBaseRepository.internface";

export interface IProductRepository extends IBaseRepository<ProductDocument> {
  // In this extra props or methods which are present for only products but not a common methods like save which is in IBaseRepository

  getAllProductsInAnOrder: () => Promise<ProductDocument>;
}