export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  createdAt: string
}

export interface CreateProductDTO {
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  id: string
}

export type ProductCategory =
  | 'Colision Vehicular'
  | 'Atropello'
  | 'Volcamiento'
  | 'Caida de Motocicleta'
  | 'Choque Frontal'
  | 'Choque Lateral'
  | 'Fuga de Vehiculo'
  | 'Accidente Multiple'

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Colision Vehicular',
  'Atropello',
  'Volcamiento',
  'Caida de Motocicleta',
  'Choque Frontal',
  'Choque Lateral',
  'Fuga de Vehiculo',
  'Accidente Multiple',
]
