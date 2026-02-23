import axios from 'axios'
import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const LoginForm = ({ registerPath, resetPath }) => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const ServerUrl = "http://localhost:5000/api/auth"
            const resp = await axios.post(`${ServerUrl}/login`, form)

            if (resp.status === 200) {

                // Clear old tokens 
                localStorage.removeItem("token")
                sessionStorage.removeItem("token")
                localStorage.removeItem("user")
                sessionStorage.removeItem("user")

                // Remember Me Logic
                if (rememberMe) {
                    localStorage.setItem("token", resp.data.token)
                    localStorage.setItem("user", JSON.stringify(resp.data.user))
                } else {
                    sessionStorage.setItem("token", resp.data.token)
                    sessionStorage.setItem("user", JSON.stringify(resp.data.user))
                }

                toast.success("Login Successfully")

                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }

        } catch (error) {
            // toast.error(error.response?.data?.message || "Login failed")
            toast.error("Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>

            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">

                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="mb-3 position-relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control pe-5"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />

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

                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember Me
                        </label>
                    </div>

                    <Link to={resetPath} className="fs-11 text-primary">
                        Forget password?
                    </Link>
                </div>


                <div className="mt-4">
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary w-100"
                    >
                        Login
                    </button>
                </div>

            </form>

            <div className="text-muted mt-4">
                <span>Don't have an account? </span>
                <Link to={registerPath} className="fw-bold">
                    Create an Account
                </Link>
                <Link to={"/authentication/changepassword/creative"} className="fw-bold">
                    Change an Password
                </Link>
            </div>
        </>
    )
}

export default LoginForm