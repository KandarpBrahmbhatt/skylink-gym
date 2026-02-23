import { genToken } from "../config/token.js"
import validator from "validator"

import bcrypt from "bcryptjs"
import User from "../Models/auth.model.js"

import sendMail from "../config/Mail.js"

export const signUp = async (req, res) => {
    try {
        let { fullname, email, password, confirmPassword, role } = req.body
        console.log(req.body)

        if (!fullname || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All filed are required" })
        }

        // Check existing user
        let existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "email already exist" })
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter valid Email" })
        }

        // Confirm password check
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" })
        }

        // Hash password
        let hashPassword = await bcrypt.hash(password, 10)

        let user = await User.create({
            fullname,
            email,
            password: hashPassword,
            role
        })

        let token = await genToken(user._id)

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: "Strict",
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // })

        return res.status(201).json({
            message: "User Register successfully",
            token, // ahiya token add karta localstorage ma token store thase.
            user,
            role
        })

    } catch (error) {
        console.log("signUp error")
        return res.status(500).json({ message: `signUp Error ${error}` })
    }
}


export const login = async (req, res) => {
    try {
        let { email, password } = req.body
        console.log(req.body)
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user does not exist" })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect Password" })
        }
        let token = await genToken(user._id)

        //aa commant karelo token ne cookie ma store karva mate use thay 6e
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: "Strict",
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // })
        return res.status(200).json({ message: "Login Successfully", token, user }) // ahiya token ne add karta local sotrage ma token store thase

    } catch (error) {
        console.log("login error")
        return res.status(500).json({ message: `login Error ${error}` })
    }
}




// export const logOut = async (req, res) => {
//     try {
//         await res.clearCookie("token")
//         return res.status(200).json({ message: "logOut Successfully" })
//     } catch (error) {
//         return res.status(500).json({ message: `logout Error ${error}` })
//     }
// }

// aa local storage mate local storeage ma token store karo to logout ni backend ma kai jarur nahi pade
export const logOut = async (req, res) => {
    try {
        return res.status(200).json({ message: "Logout Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Logout Error ${error}` })
    }
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString() // random otp generate karvamate 6 digit no 
        // console.log(otp) 
        user.resetOtp = otp,  // reset otp ma otp ne push karishu
            user.otpExpires = Date.now() + 5 * 60 * 1000, //5 min milisecond ma conver kariyu 6e.
            user.isOtpVerifed = false //starting ma otp verify false rese. 

        await user.save()
        // (email, otp)  =? means email ma send karvanu 6e and otp send karvano 6e.
        await sendMail(email, otp)  // otp send karvamate mail cofigma
        return res.status(200).json({ message: "Email Successfully send" })
    } catch (error) {

        return res.status(500).json({ message: `send otp error ${error}` })

    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })

        // 1 user che ke nahi check karse
        // 2 user otp send kariyo ae main otp na equel 6e ke nahi ae check karase
        // 3 time
        if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" })
        }
        user.isOtpVerifed = true
        user.resetOtp = undefined // aa banane ne mokalvanu nathi aetale undefined lakhiyu 6e.
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({ message: "OTP varified Successfully" })


    } catch (error) {
        return res.status(500).json({ message: `Varify otp error ${error}` })
    }
}



export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !user.isOtpVerifed) {
            return res.status(404).json({ message: "OTP verfication required" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        user.password = hashPassword
        user.isOtpVerifed = false
        await user.save()
        return res.status(200).json({ message: "Password Reset Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Reset Password error ${error}` })
    }
}

export const changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New passwords do not match" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Change password error" });
    }
};