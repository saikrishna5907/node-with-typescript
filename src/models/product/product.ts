import { injectable } from "inversify";
import { IProduct } from "./Iproduct.interface";
@injectable()
export class Product implements IProduct {
  _id?: string
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  constructor(product: IProduct) {
    this._id = product._id ? product._id : undefined;
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.description = product.description;
    this.price = product.price;
  }
}
