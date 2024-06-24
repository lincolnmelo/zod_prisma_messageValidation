import { z } from 'zod'

export const requestMessageSchema = z.object({
  id: z.string().min(1, { message: 'Must contain at least 1 character' }),
  time: z.number().min(1, { message: 'Must contain at least 1 character' }),
  messaging: z.array(z.object({
    sender: z.object({
      id: z.string().min(1, { message: 'Must contain at least 1 character' }),
    }),
    recipient: z.object({
      id: z.string().min(1, { message: 'Must contain at least 1 character' }),
    }),
    timestamp: z.number().min(1, { message: 'Must contain at least 1 character' }),
    message: z.object({
      mid: z.string().min(1, { message: 'Must contain at least 1 character' }),
      text: z.string().min(1, { message: 'Must contain at least 1 character' }),
    }).optional(),
    postback: z.object({
      mid: z.string().min(1, { message: 'Must contain at least 1 character' }),
      payload: z.string().min(1, { message: 'Must contain at least 1 character' }),
    }).optional(),
  }))
})

type _RequestMessageInput = z.infer<typeof requestMessageSchema>

export type RequestMessageInput = {
  [key in keyof _RequestMessageInput]-?: Exclude<_RequestMessageInput[key], null>
}