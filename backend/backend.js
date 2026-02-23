import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import customerRoutes from "./routes/customer.routes.js"
import leadRouter from "./routes/lead.routes.js"
// import paymentRouter from "./routes/paymentRoute.js"

dotenv.config()

let port = process.env.PORT
let app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth", authRouter)
app.use("/api/customer", customerRoutes)
app.use("/api/lead", leadRouter)
// app.use("/api/payment", paymentRouter)


app.get("/", (req, res) => {
    res.send("Hello From Server")
})


app.listen(port, () => {
    console.log("Server Started", port)
    connectDb()
})

