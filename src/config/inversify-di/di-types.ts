const productTypes = {
  ProductService: Symbol.for('ProductService'),
  ProductRepository: Symbol.for('ProductRepository'),
  ProductDocumentSchema: Symbol.for('ProductDocumentSchema')
}
const base = {
  BaseRespository: Symbol.for('BaseRespository')
}

export const INVERSIFY_TYPES = {
  ...productTypes,
  ...base
};

export default INVERSIFY_TYPES;
