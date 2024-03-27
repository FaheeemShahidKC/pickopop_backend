import IUserRepository from "./interfaces/IUserRepository";
import User from "../domian/user";
import GenerateOTP from "../infrastructure/utils/generateOtp";
import SendMail from "../infrastructure/utils/sendMail";
import jwt from 'jsonwebtoken'
import Jwt from "../infrastructure/utils/jwt";
import BcryptPassword from "../infrastructure/utils/bcryptPassword";

class UserUseCase {
     private repository: IUserRepository
     private otp: GenerateOTP
     private sendOtp: SendMail
     private Jwt: Jwt
     private bcrypt: BcryptPassword

     constructor(repository: IUserRepository, otp: GenerateOTP, sendOtp: SendMail, Jwt: Jwt, bcrypt: BcryptPassword) {
          this.repository = repository
          this.otp = otp
          this.sendOtp = sendOtp
          this.Jwt = Jwt
          this.bcrypt = bcrypt
     }

     async signupAndSendOtp(userData: User) {
          try {
               const userExist = await this.repository.findUserByEmail(userData.email)
               if (userExist) {
                    return { data: true }
               } else {
                    const otp = this.otp.generateOtp()
                    let token = jwt.sign({ userData, otp }, process.env.auth_secret as string, { expiresIn: '5m' })
                    await this.sendOtp.sendMail(userData.email, otp)
                    return {
                         data: false,
                         token: token
                    }
               }
          } catch (error) {
               console.log(error);
               throw error;
          }
     }

     async verifyOtpAndSaveUser(token: string, userOtp: string) {
          try {
               let decoded = this.Jwt.verifyToken(token)
               if (decoded) {
                    if (decoded.otp == userOtp) {
                         let hashedPassword = this.bcrypt.hashPassword(decoded.userData.password)
                         decoded.userData.password = hashedPassword
                         let newUser: any = await this.repository.saveUser(decoded.userData)
                         if (newUser) {
                              let token = this.Jwt.generateToken(newUser._id, 'user')
                              return { success: true, token }
                         } else {
                              return { success: false, message: "Internal server error!" }
                         }
                    } else {
                         return { success: false, message: "Incorrect OTP!" }
                    }
               } else {
                    return { success: false, message: "No token!Try again!" }
               }
          } catch (error) {
               console.log(error);
               throw error
          }
     }

}

export default UserUseCase