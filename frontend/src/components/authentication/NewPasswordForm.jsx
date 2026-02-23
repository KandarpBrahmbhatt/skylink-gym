
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const NewPasswordForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const ServalUrl = "http://localhost:5000/api/auth"
            const res = await axios.post(`${ServalUrl}/resetpassword`,
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            // alert(res.data.message);
            toast.success(res.data.message)

            setTimeout(() => {
                navigate("/authentication/login/creative")
            }, 1000);

        } catch (error) {
            // alert(error.response?.data?.message || "Error");
            toast.error(error.response?.data?.message || "Error")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-100" style={{ maxWidth: "320px" }}>
            <h4 className="fw-bold mb-3">Forget Password</h4>

            <form onSubmit={handleSubmit}>
                {/* Email */}
                {/* <div className="mb-3">
                    <label className="form-label small fw-semibold">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="form-control form-control-sm"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div> */}

                {/* New Password */}
                <div className="mb-3">
                    <label className="form-label small fw-semibold">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="form-control form-control-sm"
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                    <label className="form-label small fw-semibold">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control form-control-sm"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default NewPasswordForm;
