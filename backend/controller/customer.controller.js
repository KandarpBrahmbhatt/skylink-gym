import { json } from "express";
import Customer from "../Models/customer.model.js"

// export const createCustomer = async (req, resp) => {
//     try {
//         const { email } = req.body

//         let existCustomer = await Customer.findOne({ email })

//         if (existCustomer) {
//             return resp.status(400).json({ message: "email Already exist" })
//         }

//         let newCustomer = await Customer.create(req.body) // req.body mathi je data aavase ae lese.
//         resp.status(201).json({ message: "User Create Succesfulyy", newCustomer })

//     } catch (error) {
//         console.log(error)
//         resp.status(500).json({ message: "Customer is not created" })
//     }
// }

export const createCustomer = async (req, resp) => {
    try {
        // if (!req.body) {
        //     return resp.status(400).json({ message: "No data received" });
        // }

        const { email } = req.body;
        console.log(req.body)
        if (!email) {
            return resp.status(400).json({ message: "Email is required" });
        }

        let existCustomer = await Customer.findOne({ email });

        if (existCustomer) {
            return resp.status(400).json({ message: "Email already exists" });
        }

        let newCustomer = await Customer.create(req.body);
        resp.status(201).json({ message: "Customer created successfully", newCustomer });

    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: "Customer is not created" });
    }
};

// aa khali customer fatch get karvano code 6e 
export const getCustomer = async (req, resp) => {
    try {
        const customer = await Customer.find();
        resp.status(200).json({ message: "Custumer is Fatched", customer, totalCount: customer.length, })
    } catch (error) {
        resp.status(500).json({ message: "Custemor geting Error" })
        console.log(error)
    }
}

export const getSingleCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);

        res.status(200).json({ customer });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};


export const deleteCustomer = async (req, resp) => {
    try {
        const deletedCustomer = await Customer.findOneAndDelete(req.params.id)

        if (!deleteCustomer) {
            return resp.status(400).json({ message: "Customer Not Found" })
        }

        return resp.status(200).json({ message: "Customer Deleted Succsessfully", data: deletedCustomer })

    } catch (error) {
        console.log("deleted customer error", error)
        return resp.status(500).json({ message: error.message })
    }
}

export const updateCustomer = async (req, resp) => {
    try {
        const UpdateCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        if (!UpdateCustomer) {
            return resp.status(400), json({ message: "UpdatedCustomer not found" })
        }

        return resp.status(200).json({ message: "Customer is Updated Successfully", data: UpdateCustomer })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "UpdatedCustomer Error" })
    }
}

// pagination code
// export const getCustomer = async (req, resp) => {
//     try {
//         // 1. Get page and limit from query
//         const page = parseInt(req.query.page) || 1;   // default page = 1
//         const limit = parseInt(req.query.limit) || 10; // default limit = 5

//         // 2. Calculate how many records to skip
//         const skip = (page - 1) * limit;

//         // 3. Get total number of customers countdocument count karse ketala document store thaya 6e ae
//         const totalCount = await Customer.countDocuments();

//         // 4. Get paginated customers
//         const customer = await Customer.find()
//             .skip(skip)
//             .limit(limit);

//         resp.status(200).json({ message: "Custumer is Fatched", customer, totalCount: customer.length, currentPage: page, totalPages: Math.ceil(totalCount / limit) })
//     } catch (error) {
//         resp.status(500).json({ message: "Custemor geting Error" })
//         console.log(error)
//     }
// }
