import { inject, injectable } from "inversify";
import INVERSIFY_TYPES from "../../config/inversify-di/di-types";
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
      return await this.kitProductRepo.update(kitProduct);
    } catch (err) {
      throw new Error(err)
    }
  }
}