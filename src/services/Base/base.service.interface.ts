import { EnforceDocument } from "mongoose";

export interface IBaseService<T> {
  create: (item: T) => Promise<EnforceDocument<T, {}>>
  getAll: () => Promise<T[]>
  getById: (id: string) => Promise<T>
}