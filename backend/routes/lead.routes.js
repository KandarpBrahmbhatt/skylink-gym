import express from 'express'
import { createLead, deleteleads, getLead, getSingleleads, updateleades } from '../controller/leads.controller.js'

const leadRouter = express()

leadRouter.post("/create", createLead)
leadRouter.get("/get", getLead)

leadRouter.get("/get/:id", getSingleleads);
leadRouter.delete("/:id", deleteleads)
leadRouter.put("/:id", updateleades)


export default leadRouter