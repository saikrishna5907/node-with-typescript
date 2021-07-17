import { Types } from "mongoose";

export const getMongooseIds = (idsList: string[] | string): Types.ObjectId[] | Types.ObjectId | undefined => {
  if (!idsList || idsList.length === 0) {
    return;
  }
  if (typeof idsList === 'string') {
    return new Types.ObjectId(idsList);
  }
  return idsList.map(id => new Types.ObjectId(id));
}