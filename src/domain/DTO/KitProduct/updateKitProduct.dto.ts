import { ProductDocument } from "../../models/product/product";

export interface UpdateKitProductDTO {
  _id: string
  kitName: string,
  kitPrice: number,
  isActive: boolean,
  productComponents: ProductDocument['_id'][]
}