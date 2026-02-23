import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OtpVerifyForm = () => {

    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [timeLeft, setTimeLeft] = useState(60)
    const [isExpired, setIsExpired] = useState(false)

    const inputRefs = useRef([])

    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email

    const ServerUrl = "http://localhost:5000/api/auth"

    // OTP TIMER 
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true)
            return
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    // HANDLE OTP CHANGE 
    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    //  VERIFY OTP 
    const handleVerify = async (e) => {
        e.preventDefault()

        if (isExpired) {
            toast.error("OTP expired. Please resend.")
            return
        }

        const otpValue = otp.join("")

        if (otpValue.length < 6) {
            toast.error("Please enter complete OTP")
            return
        }

        try {
            await axios.post(`${ServerUrl}/sendotp`, {
                email,
                otp: otpValue
            })

            toast.success("OTP verified successfully")

            setTimeout(() => {
                navigate("/authentication/newPassword/creative", { state: { email } })
            }, 1000)

        } catch (error) {
            toast.error(error.response?.data?.message || "Verification failed")
        }
    }

    // RESEND OTP 
    const handleResendOtp = async () => {
        try {
            await axios.post(`${ServerUrl}/sendotp`, { email })

            toast.success("OTP resent successfully")

            setOtp(["", "", "", "", "", ""])
            setTimeLeft(60)
            setIsExpired(false)
            inputRefs.current[0]?.focus()

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP")
        }
    }

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Verify OTP</h2>
            <h4 className="fs-13 fw-bold mb-2">
                Please enter the one-time password sent to your email.
            </h4>

            <form className="w-100 mt-4 pt-2" onSubmit={handleVerify}>

                <div className="d-flex justify-content-center mt-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="m-2 text-center form-control"
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            required
                            style={{ width: "50px", fontSize: "20px" }}
                        />
                    ))}
                </div>

                {/* timer / reseend */}
                <div className="text-center mt-3">
                    {!isExpired ? (
                        <p className="text-muted">
                            OTP expires in <strong>{timeLeft}s</strong>
                        </p>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={handleResendOtp}
                        >
                            Resend OTP
                        </button>
                    )}
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary w-100"
                        disabled={isExpired}
                    >
                        Validate
                    </button>
                </div>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default OtpVerifyForm
