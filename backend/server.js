import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000
import connectMongoDB from './config/db.js'
import { router } from './routes/userRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

connectMongoDB()
const app = express()

app.use('/api/users', router)

app.get('/', (req, res) => {
    res.send('Working?')
})

// -error handlers
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})