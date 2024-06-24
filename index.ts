import express from 'express'
import cookieParser from 'cookie-parser'
import ErrorHandler from './src/middlewares/ErrorHandler'
import type { Request, Response, NextFunction } from 'express'
import { connectToDB } from './src/config/db'
import { HttpException } from './src/utils/HttpExceptions'
import { AppRoutes } from './src/routes/AppRoutes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', AppRoutes)

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpException(404, 'Route not found'))
})

app.use(ErrorHandler)

const initializeApp = async () => {
  try {
    app.listen(3000, () => {
      console.log(`[SERVER]: Servidor disponivel em http://127.0.0.1:3000/api`)
    })
    await connectToDB()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

initializeApp()