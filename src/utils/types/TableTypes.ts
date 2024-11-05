export type Order = 'asc' | 'desc'

export type Data = {
  meta: any
  id: number
  title: string
  category: string
  price: number
  rating: number
  stock: string
  brand: string
  createdAt: string
  updatedAt: string
}

export type HeadCell = {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}
