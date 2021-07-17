import { inject, injectable } from "inversify";
import INVERSIFY_TYPES from "../../config/inversify-di/di-types";
import { AddRemoveKitProductsDTO } from "../../domain/DTO/KitProduct/RemoveKitProductsDTO";
import { UpdateKitProductDTO } from "../../domain/DTO/KitProduct/updateKitProduct.dto";
import { IKitProductService } from "../../domain/Interfaces/service-interfaces/Ikit-product.interface";
import { KitProductDocument } from "../../domain/models/kitProduct/kit-product.model";
import { KitProducRepository } from "../../infrastructure/data/Repositories/kit-product.repository";
import { BaseService } from "../base/base.service";

@injectable()
export class KitProductService extends BaseService<KitProductDocument> implements IKitProductService {

  constructor(@inject(INVERSIFY_TYPES.KitProductRepository) private readonly kitProductRepo: KitProducRepository) {
    super(kitProductRepo);
  }
  public updateKitProduct = async (item: UpdateKitProductDTO): Promise<KitProductDocument> => {
    try {
      if (!item) { throw new Error('No values found to update') }
      const kitProduct = await this.kitProductRepo.getById(item._id);
      if (!kitProduct) { throw new Error('No Kit found to update') }
      kitProduct.kitName = item.kitName;
      kitProduct.kitPrice = item.kitPrice;
      kitProduct.isActive = item.isActive;
      kitProduct.productComponents = item.productComponents;
      return await this.kitProductRepo.update(kitProduct);
    } catch (err) {
      throw new Error(err)
    }
  }
  public addOrRemoveKitProductComponents = async (isAdd = false, requestPayload: AddRemoveKitProductsDTO): Promise<KitProductDocument> => {
    if (!requestPayload.listOfProductComponentIds || !requestPayload.listOfProductComponentIds.length) {
      throw new Error('Product Components Ids should not be empty')
    }
    if (!requestPayload.kitProductId) {

      throw new Error('Kit Product Id should not be empty');
    }
    try {
      // const kitProduct = await this.kitProductRepo.getById(requestPayload.kitProductId);
      // if (!kitProduct) { throw new Error('No Kit found to update') }
      // kitProduct.productComponents = kitProduct.productComponents.filter(docId => objectIds.includes(docId));
      let result: KitProductDocument | null;
      if (isAdd) {
        result = await this.kitProductRepo.addProductComponentsToKit(requestPayload);
      } else {
        result = await this.kitProductRepo.removeProductComponentsFromKit(requestPayload)
      }
      if (!result || result === null) {
        throw new Error('Failed to delete the kit product components...!');
      }
      return result;
    } catch (error) {
      throw new Error(error);

    }
  }


}