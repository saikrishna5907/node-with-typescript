import { EnforceDocument } from "mongoose";
import { ReadProductDTO } from "../../DTO/product/read-product.dto";
import { UpdateProductDTO } from "../../DTO/product/update-product.dto";
import { IProductRepository } from "../repository-interfaces/IProductRepository.interface";
import { ProductDocument } from "../../models/product/product";
import { IBaseService } from "./Ibase.service.interface";

export interface IProductService extends IBaseService<ProductDocument> {
  updateProduct: (item: UpdateProductDTO) => Promise<EnforceDocument<ProductDocument, {}>>;
  getAllProducts: () => Promise<ReadProductDTO[]>;
  getProductById: (_id: string) => Promise<ReadProductDTO>;
}