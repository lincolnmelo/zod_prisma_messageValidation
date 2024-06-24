import MessageController from '../controllers/MessageController'
import ValidateRequest from '../middlewares/ValidateRequest'
import { Router } from 'express'
import { requestMessageSchema } from '../validations/RequestMessageValidations'

const messageController = new MessageController()
const router = Router()

router
  .get('/', messageController.getAll.bind(messageController))
  .post('/', ValidateRequest(requestMessageSchema), messageController.create.bind(messageController))

export { router as MessageRoutes }