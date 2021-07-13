export interface UpdateProductDTO {
  _id: string;
  displayName: string;
  productName: string;
  stockOnhand: number;
  imageUrl: string;
  description: string;
  price: number;
  status: number;
}