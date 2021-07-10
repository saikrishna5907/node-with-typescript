import { ProductDocument } from "./product/product";

export interface BaseDocuments extends ProductDocument {
  // this is just keep a list of all the documents available for this system in MongoDB.
}