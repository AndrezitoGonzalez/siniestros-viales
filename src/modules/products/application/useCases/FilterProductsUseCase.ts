import type { Product } from '../../domain/models/Product'

export class FilterProductsUseCase {
  execute(products: Product[], category: string): Product[] {
    if (!category || category === 'Todas') {
      return products
    }
    return products.filter((p) => p.category === category)
  }
}
