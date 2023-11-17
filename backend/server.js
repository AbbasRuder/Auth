import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000
import connectMongoDB from './config/db.js'
import { router } from './routes/userRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

connectMongoDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/api/users', router)

// -error handlers
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})