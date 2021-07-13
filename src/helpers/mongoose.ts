import { Types } from "mongoose";

export const getMongooseIds = (idsList: string[]): Types.ObjectId[] | undefined => {
  if (!idsList || idsList.length === 0) {
    return;
  }
  return idsList.map(id => new Types.ObjectId(id));
}