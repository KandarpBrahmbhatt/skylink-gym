import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TabProfile from "./TabProfile";
import { toast } from "react-toastify";

const CustomerCreateContent = () => {

    const navigate = useNavigate();

    const [customerData, setCustomerData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        designation: "",
        website: "",
        address: "",
        description: ""
    });

    //  Create Customer
    const handleCreate = async () => {
        try {

            if (!customerData.email) {
                toast.error("Email is required");
                return;
            }

            const res = await axios.post(
                "http://localhost:5000/api/customer/create",
                customerData
            );

            toast.success(res.data.message);
            navigate("/customers/list");

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    //  Cancel
    const handleCancel = () => {
        navigate("/customers/list");
    };

    return (
        <div className="col-lg-12">

            <div className="card border-top-0">


                <div className="card-header p-0">
                    <ul className="nav nav-tabs w-100 customers-nav-tabs">
                        <li className="nav-item flex-fill border-top">
                            <a
                                href="#"
                                className="nav-link active"
                                data-bs-toggle="tab"
                                data-bs-target="#profileTab"
                            >
                                Profile
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Form Content */}
                <div className="tab-content p-3">
                    <TabProfile
                        customerData={customerData}
                        setCustomersData={setCustomerData}
                    />
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-end gap-2 p-3 border-top">

                    <button
                        type="button"
                        className="btn btn-light border"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCreate}
                    >
                        Create Customer
                    </button>

                </div>

            </div>

        </div>
    );
};

export default CustomerCreateContent;