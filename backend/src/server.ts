import express from "express"
const app = express()
import cookieParser from "cookie-parser"
const port = 7777
import cors from 'cors'
import dbConnection from "./config/database"
import dotenv from "dotenv"


dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


// api routes
import authRouter from './routes/auth'
import userRouter from './routes/user'
import profileRouter from "./routes/profile"


app.use("/",authRouter)
app.use("/",userRouter)
app.use("/",profileRouter)

dbConnection()
.then(() => {
    app.listen(process.env.PORT, ()=>{
       console.log( `server is running at ${port}`)
    })
}).catch((err:string) => {
    console.error("Database connection failed:", err);
});