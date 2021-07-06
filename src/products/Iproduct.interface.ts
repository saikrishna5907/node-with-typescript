export interface IProduct {
  title: string,
  imageUrl: string,
  price: number,
  description: string,
  save: () => {}
}

export interface IProductWithID extends IProduct {
  _id: string;
}