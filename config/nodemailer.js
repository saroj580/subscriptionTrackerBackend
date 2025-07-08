import nodemailer from "nodemailer";
import {EMAIL_PASSWORD} from "./env.js";

export const accountEmail = 'chaudharysaroj844@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user : accountEmail,
        password : EMAIL_PASSWORD
    }
})
export default transporter;