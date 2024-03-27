import nodemailer from 'nodemailer'
import INodemailerInterface from '../../useCase/interfaces/INodemailer'
import dotenv from 'dotenv'
dotenv.config();

class SendMail implements INodemailerInterface {

     private transporter;
     
     constructor() {
          this.transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
               }
          })
     }

     async sendMail(to: string, otp: string): Promise<any> {
          const mailOptions = {
               from: process.env.EMAIL,
               to,
               subject: "Pick'O'Pop - OTP for Email Verification",
               text: `Your OTP for email verification is ${otp}`
          }

          this.transporter.sendMail(mailOptions, (err) => {
               if (err) {
                    console.log(err);
               } else {
                    console.log('OTP sent successfully!')
               }
          });


     }
}

export default SendMail;