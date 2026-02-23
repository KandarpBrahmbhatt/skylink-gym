import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

// ek transpoter banavanu 6e
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,    // gmail mate aa port no use thay 6e.
  secure: true,
  auth: {
    user: process.env.EMAIL,    // user email maro
    pass: process.env.EMAIL_PASS, // user password // maro
  },
});

// to,and otp aa parameter pass karvana 6e 

// to => kone send karvano 6e
// otp => otp su 6e aapado ae.

const sendMail = async (to, otp) => {
  transporter.sendMail({
    from: process.env.EMAIL, // kaya thi email send karvanu 6e ae lakhiyu 6e. 
    to: to, // to ne otp send karishu
    subject: "Reset Your Password",
    html: `<p>Your OTP for Password Reset is <b>${otp}</b>.
        It expires in 5 minutes.</p>`
  })
}


export default sendMail