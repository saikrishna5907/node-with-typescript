import { EnforceDocument, Types } from "mongoose";
import { AddRemoveKitProductsDTO } from "../../DTO/KitProduct/RemoveKitProductsDTO";
import { KitProductDocument } from "../../models/kitProduct/kit-product.model";
import { ProductDocument } from "../../models/product/product";
import { IBaseRepository } from "./IBaseRepository.internface";

export interface IKitProductRepository extends IBaseRepository<KitProductDocument> {
  removeProductComponentsFromKit: (listOfIdsToRemove: AddRemoveKitProductsDTO) => Promise<EnforceDocument<KitProductDocument, {}> | null>;
  addProductComponentsToKit: (listOfIdsToRemove: AddRemoveKitProductsDTO) => Promise<EnforceDocument<KitProductDocument, {}> | null>;
}