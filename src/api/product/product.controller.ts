import mongodb from 'mongodb';
import { IProductWithID } from '../../models/product/Iproduct.interface';
import MongoDbConnect from '../../config/database';
import { Product } from '../../models/product/product';
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../../config/inversify-di/di-types';
import { Request, Response } from 'express';
import { ProductService } from '../../services/Product/product.service';
@controller('/products')
export class ProductController {
  constructor(@inject(TYPES.ProductService) private productService: ProductService) { }

  @httpPost('/')
  public async save(product: Product): Promise<void> {
    await this.productService.save(product);
  }
  @httpGet('/')
  public static async findAllProducts(@request() req: Request, @response() res: Response): Promise<void> {
    const dbInstance = await MongoDbConnect.getDbInstance();
    try {
      const productsResponse = await dbInstance.collection('products').find().toArray();
      res.status(200).json(productsResponse);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  public static async updateOne(product: IProductWithID): Promise<void> {
    const dbInstance = await MongoDbConnect.getDbInstance();
    try {
      const updateResult = await dbInstance.collection('products').updateOne({ _id: new mongodb.ObjectID(product._id) }, { $set: this });
      console.log(updateResult);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  public static async findById(productId: string): Promise<Product> {

    const dbInstance = await MongoDbConnect.getDbInstance();
    try {
      const product = await dbInstance.collection('products').findOne({ _id: new mongodb.ObjectID(productId) });
      console.log(product);

      return product;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
export default Product;
