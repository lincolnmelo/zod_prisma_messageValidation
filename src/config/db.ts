import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

export async function connectToDB() {
    try {
        await db.$connect()
        console.log('[DATABASE]: Conectado!')

    } catch (error) {
        console.log('[DATABASE]: Erro de conexao: ', error)
        await db.$disconnect()
    }
}