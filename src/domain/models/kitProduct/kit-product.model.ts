import { Document, model, Model, Schema, Types } from "mongoose";
import { getMongooseIds } from "../../../helpers/mongoose";
import { ProductDocument } from "../product/product";

export interface KitProduct {
  kitName: string,
  kitPrice: number;
}
/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `productComponents` field is not deterministic
 */
interface KitProductBaseDocument extends KitProduct, Document {

}
export interface KitProductDocument extends KitProductBaseDocument {
  productComponents: [ProductDocument['_id']]
}
export interface KitProductPopulatedDocument extends KitProductDocument {
  productComponents: [ProductDocument]
}
// for Model
export interface KitProductModel extends Model<KitProductDocument> {
  findProductComponents(parentProductId: string): Promise<KitProductPopulatedDocument[]>
}
enum ProductStatus {
  Active = 1,
  InActive = 0
}
const kitProductSchema = new Schema<KitProductDocument, KitProductModel>({
  kitName: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Number,
    enum: [ProductStatus.Active, ProductStatus.InActive],
    default: [ProductStatus.InActive],
    required: true
  },
  productComponents: {
    type: [Types.ObjectId],
    ref: 'productDocument',
    validate: (product: [Types.ObjectId]) => Array.isArray(product) && product.length > 0,
  }
}, {
  timestamps: true
})

// TODO implement this later
kitProductSchema.statics.findProductComponents = async function (this: Model<KitProductDocument>, idList: string[]) {

  const mongooseIds = getMongooseIds(idList);

  return await this.find({ '_id': { $in: mongooseIds } }).populate("productComponents").exec();
}

export default model<KitProductDocument, KitProductModel>("KitProduct", kitProductSchema);