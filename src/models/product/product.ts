import { Schema, Document, model, Types, Model } from 'mongoose';

export interface KitProduct extends Document {
  parentProductId: Types.ObjectId,
  productComponents: Types.Array<Types.ObjectId>
}
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

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `kitComponents` field is not deterministic
 */
interface ProductBaseDocument extends Product, Document {
  getDisplayNameAndProductName(): string;
  createdByFullName: string;
}

// Export this for strong typing
export interface ProductDocument extends ProductBaseDocument {
  kitComponents?: [KitProduct['_id']]
}
export interface ProductPopulatedDocument extends ProductBaseDocument {
  kitComponents: [KitProduct]
}

// for Model
export interface ProductModel extends Model<ProductDocument> {
  findKitsProducts(parentProductId: string): Promise<ProductPopulatedDocument>
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
    type: String,
    required: Number
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: [0],
    required: true
  },
  kitComponents: {
    type: [Types.ObjectId],
    ref: "KitProduct"
  }
}, {
  timestamps: true
});

enum ProductStatus {
  Active = 1,
  InActive = 0
}
productSchema.virtual("createdByFullName").get(function (this: ProductBaseDocument) {
  return this.createdByFirstName + ' ' + this.createdByLastName;
})

productSchema.statics.findKitProducts = async function (this: Model<ProductDocument>, id: string) {
  return await this.findById(id).populate("kitComponents").exec();
}
export default model<ProductDocument, ProductModel>("Product", productSchema);
