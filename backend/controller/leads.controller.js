import leadModel from "../Models/leads.model.js"

export const createLead = async (req, resp) => {
    try {
        // const { name, email, phone, company, Designation, description, website, Address, state, city, source, status } = req.body
        // console.log(req.body)

        // let existlead = await leadModel.findOne({ email });
        // const { existlead } = req.body;
        // console.log(req.body)

        // if (existlead) {
        //     return resp.status(400).json({ message: "Email already exists" });
        // }
        const newlead = await leadModel.create(req.body)

        return resp.status(200).json({ message: "Lead created Successfully", newlead })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "LeadCreate error", error })
    }
}

export const getLead = async (req, resp) => {
    try {
        const lead = await leadModel.find()
        return resp.status(200).json({ message: "Lead get Succesfully", lead, totalCount: lead.length })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "Lead Geting error", error })
    }
}

export const getSingleleads = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await leadModel.findById(id);

        res.status(200).json({ lead });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};


export const deleteleads = async (req, resp) => {
    try {
        const deletedleads = await leadModel.findOneAndDelete(req.params.id)

        if (!deletedleads) {
            return resp.status(400).json({ message: "lead Not Found" })
        }

        return resp.status(200).json({ message: "lead Deleted Succsessfully", data: deletedleads })

    } catch (error) {
        console.log("deleted lead error", error)
        return resp.status(500).json({ message: error.message })
    }
}

export const updateleades = async (req, resp) => {
    try {
        const Updateleades = await leadModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        if (!Updateleades) {
            return resp.status(400), json({ message: "Updatedlead not found" })
        }

        return resp.status(200).json({ message: "leads is Updated Successfully", data: Updateleades })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ message: "Updated leads Error" })
    }
}