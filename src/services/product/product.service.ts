import { inject, injectable, named } from "inversify";
import { INVERSIFY_TYPES } from "../../config/inversify-di/di-types";
import { ReadProductDTO } from "../../domain/DTO/product/read-product.dto";
import { UpdateProductDTO } from "../../domain/DTO/product/update-product.dto";
import { IProductService } from "../../domain/Interfaces/service-interfaces/Iproduct-service.interface";
import { ProductDocument } from "../../domain/models/product/product";
import { convertProdDocToReadProductDTO } from "../../infrastructure/data/Mapping/productDocToReadProductDTO.mapping";

import { ProductRepository } from "../../infrastructure/data/Repositories/product.repository";
import { BaseService } from "../base/base.service";

@injectable()
export class ProductService extends BaseService<ProductDocument> implements IProductService {

  constructor(@inject(INVERSIFY_TYPES.ProductRepository) private readonly _productRepo: ProductRepository) {
    super(_productRepo)
  }
  public getAllProductsInAnOrder = (): Promise<ProductDocument> => {
    return this._productRepo.getAllProductsInAnOrder();
  };
  public updateProduct = async (item: UpdateProductDTO): Promise<ProductDocument> => {
    try {
      const product = await this._productRepo.getById(item._id);
      if (!product) {
        throw new Error('Updating Product Not Found...!');
      }
      product.description = item.description;
      product.displayName = item.displayName;
      product.productName = item.productName;
      product.stockOnhand = item.stockOnhand;
      product.imageUrl = item.imageUrl;
      product.price = item.price;
      product.status = item.status;
      return this._productRepo.update(product);
    } catch (err) {
      throw err(err);
    }
  };

  public getAllProducts = async (): Promise<ReadProductDTO[]> => {
    try {
      const allProductsDocument = await this._productRepo.getAll();
      if (!allProductsDocument) {
        throw new Error('Could not find at least one product');
      }
      const convertedProducts = await allProductsDocument.map(product => convertProdDocToReadProductDTO(product) as ReadProductDTO)
      return convertedProducts as ReadProductDTO[];
    } catch (err) {
      throw new Error(err)
    }
  };
  public getProductById = async (_id: string): Promise<ReadProductDTO> => {
    try {
      const product = await (await this._productRepo.getById(_id)).populate('kitProducts');
      if (!product) {
        throw new Error('Could not find the id');
      }
      return convertProdDocToReadProductDTO(product) as ReadProductDTO;
    } catch (err) {
      throw new Error(err)
    }
  };
}