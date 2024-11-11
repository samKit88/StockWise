export interface Category {
  id: number
  name: string
}

export interface Brand {
  id: number
  name: string
}

export interface InventoryType {
  id: number
  name: string
  barcode: string
  category: Category
  brand: Brand
  buyingPrice: number
  sellingPrice: number
  productUnit: string
  quantity: number
  taxType: string
  description: string
  productType: string
  // images: File // one to many
}
