import * as z from 'zod'

export const receivedItemsSchema = z.object({
  quantity: z.number(),
  purchasedItemsId: z.string(),
  key: z.string().optional(),
})

export const receiveSchama = z.object({
  receiveNumber: z.string().regex(/^SSO-\d+$/, 'Use Valid format SSO-XXXXX'),
  purchaseId: z.string(),
  partnerId: z.string(),
  receivedDate: z.date(),
  receivedItems: z.array(receivedItemsSchema),
})

export type ReceiveFormData = z.infer<typeof receiveSchama>
export type ItmesFormData = z.infer<typeof receivedItemsSchema>
