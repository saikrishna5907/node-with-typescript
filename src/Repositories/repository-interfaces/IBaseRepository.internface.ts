import Product from "../../models/product/product";

export interface IBaseRepository {
  save: (product: Product) => {}
}