import { z } from 'zod'

export const createMessageSchema = z.object({
  idPage: z.string().min(1, { message: 'Must contain at least 1 character' }),
  time: z.number().min(1, { message: 'Must contain at least 1 character' }),
  messaging: z.string().min(1, { message: 'Must contain at least 1 character' }),
})

type _CreateMessageInput = z.infer<typeof createMessageSchema>

export type CreateMessageInput = {
  [key in keyof _CreateMessageInput]-?: Exclude<_CreateMessageInput[key], null>
}