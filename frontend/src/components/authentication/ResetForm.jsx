import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ResetForm = ({ path }) => {

    const [email, setEmail] = useState()
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const ServalUrl = "http://localhost:5000/api/auth"
            const res = await axios.post(`${ServalUrl}/sendotp`, { email })
            console.log(res.data.message)

            // go to otp page
            navigate("/authentication/verify/creative", { state: { email } })
        } catch (error) {
            // alert(err.response?.data?.message || "Error sending OTP")
            console.log(error)
        }
    }
    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Forgot password</h2>
            {/* <h4 className="fs-13 fw-bold mb-2">Reset to your username/password</h4> */}
            {/* <p className="fs-12 fw-medium text-muted">Enter your email and a reset link will sent to you, let's
                access our the best recommendation for you.</p> */}
            <form onSubmit={handleSubmit} action="auth-resetting-cover.html" className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input className="form-control" placeholder="Email or Username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100">Reset Now</button>
                </div>
            </form>
            {/* <div className="mt-5 text-muted">
                <span> Don't have an account?</span>
                <Link to={path} className="fw-bold"> Create an Account</Link>
            </div> */}
        </>
    )
}

export default ResetForm