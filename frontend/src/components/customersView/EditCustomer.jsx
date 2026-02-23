import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";

const EditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        // location: "",
    });

    const ServalUrl = "http://localhost:5000/api/customer";

    // get single customer
    useEffect(() => {
        const getCustomer = async () => {
            try {
                const res = await axios.get(`${ServalUrl}/get/${id}`);
                setForm(res.data.customer);
            } catch (error) {
                console.log(error);
            }
        };
        getCustomer();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Update customer
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${ServalUrl}/${id}`, form);
            navigate("/customers/list");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h5 className="mb-0">Edit Customer</h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* name */}
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* location */}
                                {/* <div className="mb-3">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                    />
                                </div> */}

                                {/* Buttons */}
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => navigate("/customers/list")}
                                    >
                                        Cancel
                                    </button>

                                    <button type="submit" className="btn btn-primary">
                                        <FiSave className="me-2" />
                                        Update Customer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCustomer;
