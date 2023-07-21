 import express from "express"
import * as auth from "./auth.controller.js"
 const authRouter = express.Router()


 authRouter.post('signup',auth.signUp)
 authRouter.post('signup',auth.signIn)

export default authRouter