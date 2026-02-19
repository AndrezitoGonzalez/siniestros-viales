import type { ProductRepository } from '../../domain/repositories/ProductRepository'

export class DeleteProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.repository.delete(id)
  }
}
