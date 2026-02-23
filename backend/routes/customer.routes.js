import express from 'express'
import { createCustomer, deleteCustomer, getCustomer, getSingleCustomer, updateCustomer } from '../controller/customer.controller.js'
// import isAuth from '../middleware/auth.middleware.js'

const customerRoutes = express.Router()

customerRoutes.post("/create", createCustomer)
customerRoutes.get("/get", getCustomer)
customerRoutes.get("/get/:id", getSingleCustomer);
customerRoutes.delete("/:id", deleteCustomer)
customerRoutes.put("/:id", updateCustomer)


export default customerRoutes