import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  // .min(7, { message: 'Password must be at least 7 characters' })
  // .regex(/[a-z]/, {
  //   message: 'Password must contain at least one lowercase letter',
  // })
  // .regex(/[A-Z]/, {
  //   message: 'Password must contain at least one uppercase letter',
  // })
  // .regex(/\d/, { message: 'Password must contain at least one digit' })
  // .regex(/[!@#$%^&*(),.?":{}|<>]/, {
  //   message: 'Password must contain at least one special character',
  // }),
})

export type SigninForm = z.infer<typeof signinSchema>
