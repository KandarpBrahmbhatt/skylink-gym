import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    company: {
        type: String
    },
    Designation: {
        type: String
    },
    description: {
        type: String
    },
    website: {
        type: String
    },
    Address: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    source: {
        type: String,
        enum: ["Website", "Facebook", "Instagram", "Google", "Referral", "Walk-in", "Phone", "Other"],
        default: "Website"
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "working", "Qualified", "declined", "Customer"],
        default: "New"
    },

}, {
    timestamps: true
})

const leadModel = mongoose.model("lead", leadSchema)

export default leadModel