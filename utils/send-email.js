import dayjs from "dayjs";
import transporter, { accountEmail } from "../config/nodemailer.js";
import { emailTemplates } from "./email-template.js";

export const sendRemainderEmail = async ({to, type, subscription}) => {
    if(!to || !type ) throw new Error("Missing required parameters: to, type, subscription");

    const template = emailTemplates.find((t) => t.label === type);
    
    if(!template) throw new Error(`Email template not found for type: ${type}`);

    const mailInfo = {
        userName: subscription.userName,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format("MMMM D, YYYY"),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    }
    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}