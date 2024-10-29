import { literal, z } from 'zod'
import { UserSchema } from './UserSchema'

export const AuthStateSchema = z.object({
  isAuthenticated: z.boolean(),
  user: UserSchema.nullable(),
})

export const AuthActionSchema = z.union([
  z.object({
    type: literal('LOGIN'),
    payload: UserSchema,
  }),
  z.object({
    type: literal('LOGOUT'),
  }),
])

export type AuthState = z.infer<typeof AuthStateSchema>
export type AuthAction = z.infer<typeof AuthActionSchema>
