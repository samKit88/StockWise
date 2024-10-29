import * as z from 'zod'

export const inventorySchema = z.object({
  name: z.string().min(2, {
    message: 'name should be list two character',
  }),
  barcode: z.string(),
  category: z.string(),
  brand: z.string(),
  buyingPrice: z.number().nullable(),
  sellingPrice: z.number().nullable(),
  productUnit: z.string(),
  quantity: z.number().nullable(),
  taxType: z.string(),
  description: z.string(),
  productType: z.string(),
})

export type InventoryFormData = z.infer<typeof inventorySchema>
