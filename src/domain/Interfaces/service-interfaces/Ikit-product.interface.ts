import { EnforceDocument } from "mongoose";
import { UpdateKitProductDTO } from "../../DTO/KitProduct/updateKitProduct.dto";
import { KitProductDocument } from "../../models/kitProduct/kit-product.model";
import { IKitProductRepository } from "../repository-interfaces/IKitProduct.repository";


export interface IKitProductService extends IKitProductRepository {
  updateKitProduct: (item: UpdateKitProductDTO) => Promise<EnforceDocument<KitProductDocument, {}>>;
}