import mongodb from 'mongodb';
import { Service } from 'typedi';
import { IProduct } from '../../products/Iproduct.interface';
import MongoDbConnect from '../../utilities/database';

@Service()
class Product implements IProduct, BaseService<Product> {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  constructor(product: IProduct) {
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.description = product.description;
    this.price = product.price;
  }
  public async save(): Promise<void> {
    const dbInstance = await MongoDbConnect.getDbInstance();
    const insertResult = await dbInstance.collection('products').insertOne(this);
    console.log(insertResult);
    await this.getBaseCrudObj().save(this);
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
