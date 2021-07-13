import { ReadProductDTO } from "../../../domain/DTO/product/read-product.dto"
import { ProductDocument } from "../../../domain/models/product/product"

export const convertProdDocToReadProductDTO = (product: ProductDocument): ReadProductDTO => {
  return {
    _id: product.id,
    displayName: product.displayName,
    productName: product.productName,
    stockOnhand: product.stockOnhand,
    imageUrl: product.imageUrl,
    description: product.description,
    price: product.price,
    status: product.status,
    createdByFullName: product.createdByFullName,
  } as ReadProductDTO
}