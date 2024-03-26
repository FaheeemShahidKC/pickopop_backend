import IUserRepository from "./interfaces/IUserRepository";
import User from "../domian/user";
import GenerateOTP from "../infrastructure/utils/generateOtp";
import SendMail from "../infrastructure/utils/sendMail";
import jwt from 'jsonwebtoken'

class UserUseCase {
     private repository: IUserRepository
     private otp: GenerateOTP
     private sendOtp: SendMail

     constructor(repository: IUserRepository, otp: GenerateOTP, sendOtp: SendMail) {
          this.repository = repository
          this.otp = otp
          this.sendOtp = sendOtp
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


}

export default UserUseCase