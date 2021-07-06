import mongodb from 'mongodb';
import { IProductWithID } from '../../models/product/Iproduct.interface';
import MongoDbConnect from '../../config/database';
import { Product } from '../../models/product/product';
import { ProductService } from '../../services/Product/product.service';

export class ProductController {
  constructor(private readonly _productsService: ProductService) { }


  public async save(product: Product): Promise<void> {
    await this._productsService.save(product);
  }
  public static async findAll(): Promise<Product[]> {
    const dbInstance = await MongoDbConnect.getDbInstance();
    try {
      return await dbInstance.collection('products').find().toArray();
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
