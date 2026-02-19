import type { Product, CreateProductDTO, UpdateProductDTO } from '../models/Product'

export interface ProductRepository {
  getAll(): Promise<Product[]>
  getById(id: string): Promise<Product | null>
  create(product: CreateProductDTO): Promise<Product>
  update(product: UpdateProductDTO): Promise<Product>
  delete(id: string): Promise<boolean>
}
