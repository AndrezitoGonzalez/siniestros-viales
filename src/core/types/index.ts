export interface PaginationParams {
  page: number
  itemsPerPage: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  itemsPerPage: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface NavigationItem {
  title: string
  icon: string
  to: string
  exact?: boolean
}
