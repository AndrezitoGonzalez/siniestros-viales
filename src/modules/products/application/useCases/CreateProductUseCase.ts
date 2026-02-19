import type { Product, CreateProductDTO } from '../../domain/models/Product'
import type { ProductRepository } from '../../domain/repositories/ProductRepository'

export class CreateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(dto: CreateProductDTO): Promise<Product> {
    if (!dto.name || dto.name.trim().length < 3) {
      throw new Error('El nombre del producto debe tener al menos 3 caracteres')
    }
    if (dto.price <= 0) {
      throw new Error('El precio debe ser mayor a 0')
    }
    if (dto.stock < 0) {
      throw new Error('El stock no puede ser negativo')
    }
    return this.repository.create(dto)
  }
}
