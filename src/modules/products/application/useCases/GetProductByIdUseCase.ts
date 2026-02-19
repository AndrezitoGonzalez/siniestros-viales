import type { Product } from '../../domain/models/Product'
import type { ProductRepository } from '../../domain/repositories/ProductRepository'

export class GetProductByIdUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    return this.repository.getById(id)
  }
}
