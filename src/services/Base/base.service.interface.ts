
export interface IBaseService<T> {
  save: (value: T) => {}
  fetchAll: () => {}
}