import { db } from '../config/db'
import type { Prisma } from '@prisma/client'

export default class MessageRepository {
    private readonly db
    constructor() {
        this.db = db
    }
    async getAll() {
        return await this.db.MSGConversations.findMany()
    }
    async create(data: Prisma.MSGConversationsCreateInput) {
        return await this.db.MSGConversations.create({ data })
    }
}