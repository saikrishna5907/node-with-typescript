const productTypes = {
  ProductService: Symbol.for('ProductService'),
  ProductRepository: Symbol.for('ProductRepository'),
}
const base = {
  BaseRespository: Symbol.for('BaseRespository')
}
const kitProductTypes = {
  KitProductRepository: Symbol.for('KitProductRepository'),
  KitProductService: Symbol.for('KitProductService'),
}

export const INVERSIFY_TYPES = {
  ...base,
  ...productTypes,
  ...kitProductTypes
};

export default INVERSIFY_TYPES;
