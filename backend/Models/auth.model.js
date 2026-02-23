import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        },
        confirmPassword: {
            type: String
        },
        resetOtp: {
            type: String
        },
        otpExpires: {
            type: Date
        },
        isOtpVerifed: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ['admin', 'customer'],
            default: "customer"
        }

    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
