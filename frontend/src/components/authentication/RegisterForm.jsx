import axios from 'axios'
import React, { useState } from 'react'
import { FiEye, FiHash } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { FiEyeOff } from "react-icons/fi"

const RegisterForm = ({ path }) => {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "customer" // default role
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form.fullname, form.email, form.password, form.confirmPassword)
        try {
            const ServalUrl = "http://localhost:5000/api/auth"
            const res = await axios.post(`${ServalUrl}/signup`, form)

            if (res.status == 201) {
                toast.success("Registration successfully")
            }
            setTimeout(() => {
                navigate("/authentication/login/creative")
            }, [1000]);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed")
            console.log(error)
        }
    }



    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Register</h2>

            <form action="index.html" className="w-100 mt-4 pt-2" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input type="text" name='fullname' className="form-control" placeholder="Full Name" onChange={handleChange} value={form.fullname} required />
                </div>
                <div className="mb-4">
                    <input type="email" name='email' onChange={handleChange} value={form.email} className="form-control" placeholder="Email" required />
                </div>

                <div className="mb-4 generate-pass">
                    <div className="input-group field">
                        <input type={showPassword ? "text" : "password"} name='password' value={form.password} onChange={handleChange} className="form-control password" id="newPassword" placeholder="Password Confirm" />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer"
                            }}
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>

                    </div>

                </div>
                <div className="mb-4">
                    <input type="password" name='confirmPassword' value={form.confirmPassword} onChange={handleChange} className="form-control" placeholder="Password again" required />
                </div>

                {/* role  */}
                <div className="mb-4">
                    <select
                        name="role"
                        className="form-control"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* <div className="mt-4">
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="receiveMial" required />
                        <label className="custom-control-label c-pointer text-muted" htmlFor="receiveMial" style={{ fontWeight: '400 !important' }}>Yes, I wnat to receive Duralux community
                            emails</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="termsCondition" required />
                        <label className="custom-control-label c-pointer text-muted" htmlFor="termsCondition" style={{ fontWeight: '400 !important' }}>I agree to all the <a href="#">Terms &amp;
                            Conditions</a> and <a href="#">Fees</a>.</label>
                    </div>
                </div> */}




                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">Create Account</button>
                </div>
            </form>
            <div className="mt-5 text-muted">
                <span>Already have an account?</span>
                <Link to={path} className="fw-bold"> Login</Link>
            </div>

        </>
    )
}

export default RegisterForm