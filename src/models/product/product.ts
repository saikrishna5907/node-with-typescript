import { IProduct } from "./Iproduct.interface";
export class Product {
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
  // private getBaseCrudObj(): BaseCrud<Product> {
  //   return new BaseCrud<Product>();
  // }

  // public static async findAll(): Promise<Product[]> {
  //   const dbInstance = await MongoDbConnect.getDbInstance();
  //   try {
  //     return await dbInstance.collection('products').find().toArray();
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // }
  // public static async updateOne(product: IProductWithID): Promise<void> {
  //   const dbInstance = await MongoDbConnect.getDbInstance();
  //   try {
  //     const updateResult = await dbInstance.collection('products').updateOne({ _id: new mongodb.ObjectID(product._id) }, { $set: this });
  //     console.log(updateResult);
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // }
  // public static async findById(productId: string): Promise<Product> {

  //   const dbInstance = await MongoDbConnect.getDbInstance();
  //   try {
  //     const product = await dbInstance.collection('products').findOne({ _id: new mongodb.ObjectID(productId) });
  //     console.log(product);

  //     return product;
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // }
  // public setTitle(title: string) {
  //   this.title = title;
  // }
  // public setImageUrl(imageUrl: string) {
  //   this.imageUrl = imageUrl;
  // }
  // public setPrice(price: number) {
  //   this.price = price;
  // }
  // public setDescription(description: string) {
  //   this.description = description;
  // }

  // public getTitle(): string {
  //   return this.title;
  // }

  // public getPrice(): number {
  //   return this.price;
  // }
  // public getImageUrl(): string {
  //   return this.imageUrl;
  // }
  // public getDescription(): string {
  //   return this.description;
  // }
}
