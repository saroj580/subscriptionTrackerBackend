import {emailTemplates} from "./email-template.js";
import dayjs from "dayjs";
import transporter, {accountEmail} from "../config/nodemailer.js";

export const sendReminderEmail = async({to, type, subscription}) => {
    if(!to || !type) throw new Error('Missing required parameters');

    const templates = emailTemplates.find((t) => t.label === type)

    if(!templates) throw new Error('Invalid email type');

    const mailInfo = {
        userName : subscription.user.name,
        subscription : subscription.name,
        renewalDate : dayjs(subscription.renewalDate).format('MM-DD-YYYY'),
        planName : subscription.name,
        price : `${subscription.curency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod : subscription.paymentMethod,
    }

    const message = templates.generateBody(mailInfo);
    const subject = templates.generateSubject(mailInfo)

    const mailOptions = {
        from : accountEmail,
        to : to,
        subject: subject,
        html: message,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return console.error(error, 'error sending email');

        console.log("email sent", info.response);
    })
}