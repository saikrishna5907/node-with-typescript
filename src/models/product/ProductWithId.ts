import Product from "./product";
import { IProduct } from "./Iproduct.interface";
export class ProductWithId extends Product {
  _id: string;
  constructor(product: IProduct, id: string) {
    super(product);
    this._id = id;
  }

}