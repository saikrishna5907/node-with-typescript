export interface IProduct {
  title: string,
  imageUrl: string,
  price: number,
  description: string,
}

export interface IProductWithID extends IProduct {
  _id: string;
}