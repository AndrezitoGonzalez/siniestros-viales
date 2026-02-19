import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, CreateProductDTO, UpdateProductDTO } from '../../domain/models/Product'
import type { LoadingState } from '@/core/types'
import { productService } from '../../infrastructure/services/ProductService'
import {
  GetProductsUseCase,
  GetProductByIdUseCase,
  CreateProductUseCase,
  DeleteProductUseCase,
  UpdateProductUseCase,
  FilterProductsUseCase,
  SearchProductsUseCase,
  PaginateProductsUseCase,
} from '../../application/useCases'

const getProductsUC = new GetProductsUseCase(productService)
const getProductByIdUC = new GetProductByIdUseCase(productService)
const createProductUC = new CreateProductUseCase(productService)
const deleteProductUC = new DeleteProductUseCase(productService)
const updateProductUC = new UpdateProductUseCase(productService)
const filterProductsUC = new FilterProductsUseCase()
const searchProductsUC = new SearchProductsUseCase()
const paginateProductsUC = new PaginateProductsUseCase()

export const useProductStore = defineStore('products', () => {
  // --- State ---
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const loadingState = ref<LoadingState>('idle')
  const error = ref<string | null>(null)
  const searchTerm = ref('')
  const selectedCategory = ref('Todas')
  const page = ref(1)
  const itemsPerPage = ref(8)

  // --- Getters ---
  const isLoading = computed(() => loadingState.value === 'loading')

  const filteredProducts = computed(() => {
    let result = filterProductsUC.execute(products.value, selectedCategory.value)
    result = searchProductsUC.execute(result, searchTerm.value)
    return result
  })

  const paginatedProducts = computed(() => {
    return paginateProductsUC.execute(filteredProducts.value, {
      page: page.value,
      itemsPerPage: itemsPerPage.value,
    })
  })

  const categories = computed(() => {
    const cats = [...new Set(products.value.map((p) => p.category))]
    return ['Todas', ...cats.sort()]
  })

  const totalProducts = computed(() => products.value.length)

  const totalCategories = computed(() => {
    return new Set(products.value.map((p) => p.category)).size
  })

  const lowStockProducts = computed(() => {
    return products.value.filter((p) => p.stock <= 10)
  })

  const latestProducts = computed(() => {
    return [...products.value]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  })

  const productsByCategory = computed(() => {
    const map = new Map<string, number>()
    products.value.forEach((p) => {
      map.set(p.category, (map.get(p.category) || 0) + 1)
    })
    return Array.from(map.entries()).map(([category, count]) => ({ category, count }))
  })

  // --- Actions ---
  async function fetchProducts(): Promise<void> {
    loadingState.value = 'loading'
    error.value = null
    try {
      products.value = await getProductsUC.execute()
      loadingState.value = 'success'
    } catch (e) {
      error.value = (e as Error).message
      loadingState.value = 'error'
    }
  }

  async function fetchProductById(id: string): Promise<void> {
    loadingState.value = 'loading'
    error.value = null
    try {
      currentProduct.value = await getProductByIdUC.execute(id)
      loadingState.value = 'success'
    } catch (e) {
      error.value = (e as Error).message
      loadingState.value = 'error'
    }
  }

  async function createProduct(dto: CreateProductDTO): Promise<Product | null> {
    loadingState.value = 'loading'
    error.value = null
    try {
      const created = await createProductUC.execute(dto)
      products.value = [created, ...products.value]
      loadingState.value = 'success'
      return created
    } catch (e) {
      error.value = (e as Error).message
      loadingState.value = 'error'
      return null
    }
  }

  async function updateProduct(dto: UpdateProductDTO): Promise<Product | null> {
    loadingState.value = 'loading'
    error.value = null
    try {
      const updated = await updateProductUC.execute(dto)
      products.value = products.value.map((p) => (p.id === updated.id ? updated : p))
      loadingState.value = 'success'
      return updated
    } catch (e) {
      error.value = (e as Error).message
      loadingState.value = 'error'
      return null
    }
  }

  async function deleteProduct(id: string): Promise<boolean> {
    loadingState.value = 'loading'
    error.value = null
    try {
      const deleted = await deleteProductUC.execute(id)
      if (deleted) {
        products.value = products.value.filter((p) => p.id !== id)
      }
      loadingState.value = 'success'
      return deleted
    } catch (e) {
      error.value = (e as Error).message
      loadingState.value = 'error'
      return false
    }
  }

  function setSearchTerm(term: string): void {
    searchTerm.value = term
    page.value = 1
  }

  function setCategory(category: string): void {
    selectedCategory.value = category
    page.value = 1
  }

  function setPage(newPage: number): void {
    page.value = newPage
  }

  function setItemsPerPage(count: number): void {
    itemsPerPage.value = count
    page.value = 1
  }

  return {
    // State
    products,
    currentProduct,
    loadingState,
    error,
    searchTerm,
    selectedCategory,
    page,
    itemsPerPage,
    // Getters
    isLoading,
    filteredProducts,
    paginatedProducts,
    categories,
    totalProducts,
    totalCategories,
    lowStockProducts,
    latestProducts,
    productsByCategory,
    // Actions
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    setSearchTerm,
    setCategory,
    setPage,
    setItemsPerPage,
  }
})
