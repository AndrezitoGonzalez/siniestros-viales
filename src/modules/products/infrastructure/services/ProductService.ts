import type { Product, CreateProductDTO, UpdateProductDTO } from '../../domain/models/Product'
import type { ProductRepository } from '../../domain/repositories/ProductRepository'
import productsData from '../mock/products.json'
import { generateId } from '@/core/utils'

const SIMULATED_LATENCY_MS = 600

function simulateLatency<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), SIMULATED_LATENCY_MS)
  })
}

let productsStore: Product[] = [...(productsData as Product[])]

export class ProductServiceImpl implements ProductRepository {
  async getAll(): Promise<Product[]> {
    return simulateLatency([...productsStore])
  }

  async getById(id: string): Promise<Product | null> {
    const product = productsStore.find((p) => p.id === id)
    return simulateLatency(product ?? null)
  }

  async create(dto: CreateProductDTO): Promise<Product> {
    const newProduct: Product = {
      ...dto,
      id: `prod-${generateId()}`,
      createdAt: new Date().toISOString(),
    }
    productsStore = [newProduct, ...productsStore]
    return simulateLatency(newProduct)
  }

  async update(dto: UpdateProductDTO): Promise<Product> {
    const index = productsStore.findIndex((p) => p.id === dto.id)
    if (index === -1) {
      throw new Error(`Siniestro con id ${dto.id} no encontrado`)
    }
    const updated: Product = { ...productsStore[index], ...dto }
    productsStore = productsStore.map((p) => (p.id === dto.id ? updated : p))
    return simulateLatency(updated)
  }

  async delete(id: string): Promise<boolean> {
    const index = productsStore.findIndex((p) => p.id === id)
    if (index === -1) return simulateLatency(false)
    productsStore = productsStore.filter((p) => p.id !== id)
    return simulateLatency(true)
  }
}

export const productService = new ProductServiceImpl()
