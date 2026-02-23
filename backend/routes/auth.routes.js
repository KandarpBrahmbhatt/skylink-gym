import express from "express"
import { changePassword, login, logOut, resetPassword, sendOtp, signUp, verifyOtp } from "../controller/auth.controller.js"
import isAuth from "../middleware/auth.middleware.js"

const authRouter = express.Router()

authRouter.post("/signup", signUp)

authRouter.post("/login", login)
authRouter.get("/logout", logOut)
authRouter.post("/sendotp", sendOtp)
authRouter.post("/verifyotp", verifyOtp)
authRouter.post("/resetpassword", resetPassword)
authRouter.put("/changepassword/:id", isAuth, changePassword)


export default authRouter