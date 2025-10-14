import Mail from "nodemailer/lib/mailer"
import EventEmitter from "events"
import { template } from "./email.tempelate"
import { sendEmail } from "./send.email"

export const emailEvent = new EventEmitter() 
interface IEmail extends Mail.Options {
otp : number ,
username : string

}


emailEvent.on("confirmEmail", async(data:IEmail)=>{
    try {
    data.subject ="confirma your email"
data.html = template(data.otp,data.username,data.subject)
await sendEmail(data)
    
    } catch (error) {
        console.log("failed to send email",error)
    }

})



emailEvent.on("forgotPassword", async(data:IEmail)=>{
    try {
    data.subject ="forgot password"
data.html = template(data.otp,data.username,data.subject)
await sendEmail(data)
    
    } catch (error) {
        console.log("failed to send email",error)
    }

})