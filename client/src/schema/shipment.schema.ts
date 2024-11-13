import * as z from 'zod'

export const shippedItemsSchama = z.object({
  quantity: z.number(),
  salesItemId: z.string(),
  key: z.string().optional(),
})

export const shipmentSchama = z.object({
  shipmentNumber: z.string().regex(/^SSO-\d+$/, 'Use Valid format PO-XXXXX'),
  salesId: z.string(),
  partnerId: z.string(),
  shipmentDate: z.date(),
  shippedItems: z.array(shippedItemsSchama),
})

export type ShipmentFormData = z.infer<typeof shipmentSchama>
export type ItmesFormData = z.infer<typeof shippedItemsSchama>
