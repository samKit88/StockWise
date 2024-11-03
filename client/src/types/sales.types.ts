export interface SalesItems {
  id: number
  productId: number
  quantity: number
  unitPrice: number
  inventoryId: number
}

export interface SalesType {
  id: number
  salesNumber: string
  orderDate: Date
  partnerId: number
  salesItems: SalesItems
}
