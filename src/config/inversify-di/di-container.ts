import { Container } from "inversify";
import { ProductRepository } from "../../Repositories/Product.repository";
import { ProductService } from "../../services/Product/product.service";
import TYPES from "./di-types";

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
    }
  }

  private configureRepositories(): void {
    this.diContainer.bind<ProductRepository>(TYPES.ProductRepository).to(ProductRepository).inSingletonScope();

  }
  private configureServices(): void {
    this.diContainer.bind<ProductService>(TYPES.ProductService).to(ProductService).inSingletonScope();
  }
}