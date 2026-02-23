import axios from "axios";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const token =
                localStorage.getItem("token") || sessionStorage.getItem("token");

            const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));

            const ServerUrl = "http://localhost:5000/api/auth";

            const resp = await axios.put(`${ServerUrl}/changepassword/${user._id}`, form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (resp.status === 200) {
                toast.success("Password Changed Successfully");
                setTimeout(() => navigate("/"), 1000);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Error changing password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: "100%", maxWidth: "450px" }}>

                <h3 className="fw-bold text-center mb-4">Change Password</h3>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3 position-relative">
                        <label className="form-label fw-semibold">Old Password</label>
                        <input
                            type={showOld ? "text" : "password"}
                            className="form-control form-control-lg pe-5"
                            name="oldPassword"
                            value={form.oldPassword}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                            onClick={() => setShowOld(!showOld)}
                        >
                            {showOld ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>

                    <div className="mb-3 position-relative">
                        <label className="form-label fw-semibold">New Password</label>
                        <input
                            type={showNew ? "text" : "password"}
                            className="form-control form-control-lg pe-5"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                            onClick={() => setShowNew(!showNew)}
                        >
                            {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>


                    <div className="mb-4 position-relative">
                        <label className="form-label fw-semibold">Confirm Password</label>
                        <input
                            type={showConfirm ? "text" : "password"}
                            className="form-control form-control-lg pe-5"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Updating...
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </button>

                </form>

            </div>
        </div>
    );
};

export default ChangePassword;