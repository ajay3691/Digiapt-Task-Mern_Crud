import express from "express";
let app = express()

import mongoose from "mongoose";
import dotenv from 'dotenv'

import productRoute from "./routes/productRoute.js"
import authRouter from "./routes/authRoute.js";
import morgan from 'morgan'
import cors from 'cors'

app.use(cors({ origin: '*' })); 
app.use(morgan('tiny')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

app.use('/uploads', express.static('uploads'));

app.use("/api",productRoute)
app.use("/user",authRouter)

app.get("/", (req, resp) => {
    resp.send("Express App - Root APi.......")
})

dotenv.config({ path: './config/config.env' })
let port = process.env.PORT
let host = process.env.HOST
let mongodb_url = process.env.MONGODB_URL

mongoose.connect(mongodb_url/* , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} */)
    .then(() => {
        console.log(`Mongo db conection Succesfull`)
    })
    .catch((err) => {
        console.log(`Mongo db Conection failed`)
    })
app.listen(port, host, (err) => {
    if (err) throw err
    console.log(`Server Running on http://${host}:${port}`)
})