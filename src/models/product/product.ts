import { IProduct } from "./Iproduct.interface";
export class Product {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  constructor(product: IProduct) {
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.description = product.description;
    this.price = product.price;
  }
}
