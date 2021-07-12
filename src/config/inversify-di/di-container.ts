import { Container } from "inversify";
import { ProductDocument } from "../../models/product/product";
import { BaseRespository } from "../../Repositories/base-repository";
import { ProductRepository } from "../../Repositories/product.repository";
import { ProductService } from "../../services/Product/product.service";
import INVERSIFY_TYPES from "./di-types";
export class DIContainer {
  public diContainer: Container;
  constructor() {
    this.diContainer = new Container();
    this.configure();
  }
  private configure(): void {
    if (process.env.MOCK === 'true') {
      //  configure mock repositories and services
    } else {
      this.configureRepositories();
      this.configureServices();
      // this.configureMongooseSchema();
    }
  }

  private configureRepositories(): void {
    this.diContainer.bind<ProductRepository>(INVERSIFY_TYPES.ProductRepository).to(ProductRepository).inSingletonScope();
    this.configureBaseRepositoryMappings();
  }
  private configureServices(): void {
    this.diContainer.bind<ProductService>(INVERSIFY_TYPES.ProductService).to(ProductService).inSingletonScope();
  }
  // private configureMongooseSchema(): void {
  //   this.diContainer.bind<ProductModel>(TYPES.ProductDocumentSchema).to(productSchema).inSingletonScope();
  // }
  //  this is to map or specificy which repository class should base repository's injection should use
  private configureBaseRepositoryMappings(): void {
    this.diContainer.bind<BaseRespository<ProductDocument>>(INVERSIFY_TYPES.BaseRespository).to(BaseRespository).whenTargetNamed(INVERSIFY_TYPES.ProductRepository);
  }
}