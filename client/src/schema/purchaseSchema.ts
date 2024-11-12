import * as z from 'zod'

export const purchaseItemSchama = z.object({
  inventoryId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  key: z.string().optional(),
})

export const purchaseSchama = z.object({
  purchaseNumber: z.string().regex(/^PO-\d+$/, 'Use Valid format PO-XXXXX'),
  orderDate: z.date(),
  partnerId: z.string(),
  purchaseItems: z.array(purchaseItemSchama),
})

export type PurchaseFormData = z.infer<typeof purchaseSchama>
export type ItmesFormData = z.infer<typeof purchaseItemSchama>
