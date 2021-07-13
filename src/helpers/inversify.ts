import INVERSIFY_TYPES from "../config/inversify-di/di-types";
import { ProductRepository } from "../infrastructure/data/Repositories/product.repository"

export const getSymbolBasedOnRepoType = <T>(genericRepo: T): symbol => {
  const availableRepos = [ProductRepository];
  availableRepos.forEach(repo => {
    if (genericRepo instanceof repo) {
      const repoName = repo.name;
      return INVERSIFY_TYPES;
    }
  })
  return INVERSIFY_TYPES.ProductRepository
}