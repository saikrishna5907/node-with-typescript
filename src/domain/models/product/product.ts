import { Schema, Document, model, Types, Model } from 'mongoose';
import { KitProductDocument } from '../kitProduct/kit-product.model';

export interface Product {
  createdByFirstName: string;
  createdByLastName: string;
  displayName: string;
  productName: string;
  stockOnhand: number;
  imageUrl: string;
  description: string;
  price: number;
  status: number;
}
// base is beacause this is specific to only product, if you see in ProductDocument that interface has KitComponents,
// which are not related to product scope

// this interface will have the Product variables and also all the methods of mongoose Document,
// the main purpose of this interface creation is to create new custom methods base on the business logic needs


interface ProductBaseDocument extends Product, Document {
  getDisplayNameAndProductName(): string;
  createdByFullName: string;
}

// Export this for strong typing
// tslint:disable-next-line:no-empty-interface
export interface ProductDocument extends ProductBaseDocument {
  // kitComponents?: [KitProductDocument['_id']]
}
// tslint:disable-next-line:no-empty-interface
export interface ProductPopulatedDocument extends ProductBaseDocument {
  // kitComponents: [KitProductDocument]
}

// for Model
export interface ProductModel extends Model<ProductDocument> {
  findKitsProducts(parentProductId: string): Promise<ProductPopulatedDocument>
}

enum ProductStatus {
  Active = 1,
  InActive = 0
}

const productSchema = new Schema<ProductDocument, ProductModel>({
  createdByFirstName: {
    type: String,
    required: true
  },
  createdByLastName: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  stockOnhand: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    enum: [ProductStatus.Active, ProductStatus.InActive],
    default: [ProductStatus.InActive],
    required: true
  },
  kitComponents: {
    type: [Types.ObjectId],
    ref: "KitProduct"
  }
}, {
  timestamps: true
});


productSchema.virtual("createdByFullName").get(function (this: ProductBaseDocument) {
  return this.createdByFirstName + ' ' + this.createdByLastName;
})

// productSchema.statics.findKitProducts = async function (this: Model<ProductDocument>, id: string) {
//   return await this.findById(id).populate("kitComponents").exec();
// }
export default model<ProductDocument, ProductModel>("Product", productSchema);
