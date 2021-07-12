import { EnforceDocument } from "mongoose";
import { UpdateProductDTO } from "../../DTO/update-product.dto";
import { IProductRepository } from "../../Repositories/repository-interfaces/IProductRepository.interface";
import { ProductDocument } from "./product";

export interface IProductService extends IProductRepository {
  updateProduct: (item: UpdateProductDTO) => Promise<EnforceDocument<ProductDocument, {}>>;
}