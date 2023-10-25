import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import mongoose from 'mongoose'

import router from './src/routes'

config()

const app = express()
const port = process.env.PORT || 3000
const host = 'localhost';

(async () => {
    mongoose.connect(process.env.MONGO_URI)
    const db = mongoose.connection

    db.on('error', (err) => {
        console.error('MongoDB connection error:', err)
    })

    db.once('open', () => {
        console.log('Connected to MongoDB')
    })
})()


app.use(cors())
app.use(bodyParser.json())

app.use('/api', router)

app.listen(port, () => {
    console.log(`Server started on http://${host}:${port}`)
})