import { Router } from 'express'
import { MessageRoutes } from './MessageRoutes'

const router = Router()
router.use(
  '/message',
  MessageRoutes
)

export { router as AppRoutes }