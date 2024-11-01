import { z } from 'zod'

export const partnerSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  customerGroup: z.string(),
  phoneNumber: z.number(),
  country: z.string(),
  city: z.string(),
  address: z.string(),
  zipCode: z.number(),
  customer: z.number().nullable(),
  supplier: z.string().nullable(),
})

export type PartnerFormType = z.infer<typeof partnerSchema>
