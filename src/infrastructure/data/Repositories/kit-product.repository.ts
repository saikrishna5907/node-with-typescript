import { injectable } from "inversify";
import { IKitProductRepository } from "../../../domain/Interfaces/repository-interfaces/IKitProduct.repository";
import { KitProductDocument } from "../../../domain/models/kitProduct/kit-product.model";
import { BaseRespository } from "./base-repository";
import kitProductSchema from '../../../domain/models/kitProduct/kit-product.model'
import { Types } from "mongoose";
import { getMongooseIds } from "../../../helpers/mongoose";
import { AddRemoveKitProductsDTO } from "../../../domain/DTO/KitProduct/RemoveKitProductsDTO";
@injectable()
export class KitProducRepository extends BaseRespository<KitProductDocument> implements IKitProductRepository {
  /**
   *
   */
  constructor() {
    super(kitProductSchema);
  }
  public removeProductComponentsFromKit = async (listOfIdsToRemove: AddRemoveKitProductsDTO): Promise<KitProductDocument | null> => {
    try {
      const _id = getMongooseIds(listOfIdsToRemove.kitProductId) as Types.ObjectId;
      const idsList = getMongooseIds(listOfIdsToRemove.listOfProductComponentIds) as Types.ObjectId[]
      return await kitProductSchema.findByIdAndUpdate({ _id },
        { $pull: { productComponents: { $in: idsList } } }, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }
  public addProductComponentsToKit = async (listOfIdsToRemove: any): Promise<KitProductDocument | null> => {
    try {
      const _id = getMongooseIds(listOfIdsToRemove.kitProductId) as Types.ObjectId;
      const idsList = getMongooseIds(listOfIdsToRemove.listOfProductComponentIds) as Types.ObjectId[]
      return await kitProductSchema.findByIdAndUpdate({ _id },
        { $push: { productComponents: idsList } }, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  };
}