import type { Product } from '../../domain/models/Product'

export class SearchProductsUseCase {
  execute(products: Product[], searchTerm: string): Product[] {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return products
    }
    const term = searchTerm.toLowerCase().trim()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    )
  }
}
