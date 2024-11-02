import * as z from 'zod'

export const salesItemsSchema = z.object({
  inventoryId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  key: z.string().optional(),
})

export const salesSchema = z.object({
  salesNumber: z.string().regex(/^SO-\d+$/, 'Invalid order format'),
  orderDate: z.date(),
  partnerId: z.string(),
  salesItems: z.array(salesItemsSchema),
})

export type SalesFormData = z.infer<typeof salesSchema>
export type ItmesFormData = z.infer<typeof salesItemsSchema>
