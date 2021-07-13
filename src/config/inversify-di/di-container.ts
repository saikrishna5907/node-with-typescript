import { Container } from "inversify";
import { ProductDocument } from "../../domain/models/product/product";
import { BaseRespository } from "../../infrastructure/data/Repositories/base-repository";
import { KitProducRepository } from "../../infrastructure/data/Repositories/kit-product.repository";
import { ProductRepository } from "../../infrastructure/data/Repositories/product.repository";
import { KitProductService } from "../../services/kit-product/kit-product.service";
import { ProductService } from "../../services/product/product.service";
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
    this.diContainer.bind<KitProducRepository>(INVERSIFY_TYPES.KitProductRepository).to(KitProducRepository).inSingletonScope();

    this.configureBaseRepositoryMappings();
  }
  private configureServices(): void {
    this.diContainer.bind<ProductService>(INVERSIFY_TYPES.ProductService).to(ProductService).inSingletonScope();
    this.diContainer.bind<KitProductService>(INVERSIFY_TYPES.KitProductService).to(KitProductService).inSingletonScope();
  }
  //  this is to map or specificy which repository class should base repository's injection should use which is not working at the moment
  private configureBaseRepositoryMappings(): void {
    this.diContainer.bind<BaseRespository<ProductDocument>>(INVERSIFY_TYPES.BaseRespository).to(BaseRespository).whenTargetNamed(INVERSIFY_TYPES.ProductRepository);
  }
}