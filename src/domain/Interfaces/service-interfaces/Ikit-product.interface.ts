import { EnforceDocument } from "mongoose";
import { AddRemoveKitProductsDTO } from "../../DTO/KitProduct/AddRemoveKitProductsDTO";
import { UpdateKitProductDTO } from "../../DTO/KitProduct/updateKitProduct.dto";
import { KitProductDocument } from "../../models/kitProduct/kit-product.model";
import { IBaseService } from "./Ibase.service.interface";


export interface IKitProductService extends IBaseService<KitProductDocument> {
  updateKitProduct: (item: UpdateKitProductDTO) => Promise<EnforceDocument<KitProductDocument, {}>>;
  addOrRemoveKitProductComponents: (isAdd: boolean, listOfIds: AddRemoveKitProductsDTO) => Promise<EnforceDocument<KitProductDocument, {}>>;
}