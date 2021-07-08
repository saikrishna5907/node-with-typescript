const productTypes = {
  ProductService: Symbol.for('ProductService'),
  ProductRepository: Symbol.for('ProductRepository')
}

const TYPES = {
  ...productTypes
};

export default TYPES;
