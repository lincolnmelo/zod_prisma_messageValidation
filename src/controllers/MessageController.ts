import MessageService from '../services/MessageService'
import type { NextFunction, Request, Response } from 'express'
import { apiLogger } from '../config/apiLogger'

const messageService = new MessageService()
export default class MessageController {
  private readonly messageService: MessageService
  constructor() {
    this.messageService = messageService
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      apiLogger.info('[MessageController -> MessageService.getAll]')
      const messages = await this.messageService.getAll(req)
      res.status(200).json(messages)
    } catch (err) {
      next(err)
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      apiLogger.info('[MessageController -> MessageService.create]', req.body)
      const messages = await this.messageService.create(req)
      res.status(200).json(messages)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}