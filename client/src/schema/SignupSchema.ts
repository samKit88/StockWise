import { z } from 'zod'

export const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type SignupForm = z.infer<typeof signupSchema>
