import { injectable } from "inversify";
import { IKitProductRepository } from "../../../domain/Interfaces/repository-interfaces/IKitProduct.repository";
import { KitProductDocument } from "../../../domain/models/kitProduct/kit-product.model";
import { BaseRespository } from "./base-repository";
import kitProductSchema from '../../../domain/models/kitProduct/kit-product.model'
@injectable()
export class KitProducRepository extends BaseRespository<KitProductDocument> implements IKitProductRepository {
  /**
   *
   */
  constructor() {
    super(kitProductSchema);
  }
}