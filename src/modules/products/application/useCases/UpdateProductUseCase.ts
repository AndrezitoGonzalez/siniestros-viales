import type { Product, UpdateProductDTO } from '../../domain/models/Product'
import type { ProductRepository } from '../../domain/repositories/ProductRepository'

export class UpdateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(dto: UpdateProductDTO): Promise<Product> {
    if (dto.name !== undefined && dto.name.trim().length < 3) {
      throw new Error('El nombre del producto debe tener al menos 3 caracteres')
    }
    if (dto.price !== undefined && dto.price <= 0) {
      throw new Error('El precio debe ser mayor a 0')
    }
    if (dto.stock !== undefined && dto.stock < 0) {
      throw new Error('El stock no puede ser negativo')
    }
    return this.repository.update(dto)
  }
}
