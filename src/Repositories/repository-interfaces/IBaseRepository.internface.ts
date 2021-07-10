import { EnforceDocument } from "mongoose";

export interface IBaseRepository<T> {
  create: (item: T) => Promise<EnforceDocument<T, {}>>
  getAll: () => Promise<T[]>
  getById: (id: string) => Promise<T>
}