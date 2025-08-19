import express from "express"
const app = express()
import cookieParser from "cookie-parser"
const port = 7777
import cors from 'cors'
import dbConnection from './config/database.js'

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

dbConnection()
.then(() => {
    console.log("Database connected")
    app.listen(port,()=>{
       console.log( `server is running at ${port}`)
    })
}).catch((err:string) => {
    console.error("Database connection failed:", err);
});