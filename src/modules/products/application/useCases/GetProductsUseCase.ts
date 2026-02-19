import type { Product } from '../../domain/models/Product'
import type { ProductRepository } from '../../domain/repositories/ProductRepository'

export class GetProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repository.getAll()
  }
}
