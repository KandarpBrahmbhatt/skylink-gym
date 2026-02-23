import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    phone: {
        type: String
    },
    company: {
        type: String
    },
    designation: {
        type: String
    },
    website: {
        type: String
    },
    Address: {
        type: String
    },
    description: {
        type: String
    },
    dob: {
        type: Date
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    timezone: {
        type: String
    },
    languages: {
        type: String
    },
    currency: {
        type: String
    },
    group: {
        type: String
    },
    status: {
        type: String
    },
    privacy: {
        type: String
    },

}, {
    timestamps: true
})

const Customer = mongoose.model("Customer", customerSchema)

export default Customer