import type { Product } from '../../domain/models/Product'
import type { PaginatedResult, PaginationParams } from '@/core/types'

export class PaginateProductsUseCase {
  execute(products: Product[], params: PaginationParams): PaginatedResult<Product> {
    const { page, itemsPerPage } = params
    const total = products.length
    const totalPages = Math.ceil(total / itemsPerPage)
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    const data = products.slice(start, end)

    return {
      data,
      total,
      page,
      itemsPerPage,
      totalPages,
    }
  }
}
