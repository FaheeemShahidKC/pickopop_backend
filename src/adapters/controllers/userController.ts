import { Request, Response } from "express";
import UserUseCase from "../../useCase/userUseCase";
import User from "../../domian/user";

class UserController {
     private userUseCase: UserUseCase

     constructor(userUseCase: UserUseCase) {
          this.userUseCase = userUseCase
     }

     async signupAndSendOtp(req: Request, res: Response) {
          try {
               const { name, email, password, mobile } = req.body
               const userData = { name, email, password, mobile }
               let existingUser = await this.userUseCase.signupAndSendOtp(userData as User)
               if (!existingUser.data) {
                    const token = existingUser?.token
                    console.log("OTP done!!");
                    res.status(200).json({ success: true, token })
               } else {
                    res.send(409).json({ success: false, message: "Email already exists" });
               }
          } catch (error) {
               console.log(error);

          }
     }

     async verifyOtpAndSaveUser(req: Request, res: Response) {
          try {
               let token = req.headers.authorization?.split(' ')[1] as string
               console.log('token' + token)
               const { userOtp } = req.body
               let saveduser = await this.userUseCase.verifyOtpAndSaveUser(userOtp, token)
               if (saveduser.success) {
                    res.cookie('userToken', saveduser.token, {
                         expires: new Date(Date.now() + 25892000000),
                         httpOnly: true
                    })
                    res.status(200).json(saveduser)
               } else {
                    res.status(402).json({ success: false, message: saveduser.message })
               }
          } catch (error) {
               console.log(error);
               res.status(500).json({ success: false, message: 'Internal server error!' })
          }
     }

     async login(req: Request, res: Response) {
          try {
               const { email, password } = req.body
               const userLogedIn = await this.userUseCase.login(email, password)
               if (userLogedIn) {
                    if (userLogedIn.success) {
                         res.cookie('userToken', userLogedIn.token, {
                              expires: new Date(Date.now() + 25892000000),
                              httpOnly: true
                         })
                         res.status(200).json({ success: true, token: userLogedIn.token })
                    } else {
                         res.status(401).json({ success: false, message: userLogedIn.message })
                    }
               } else {
                    res.status(401).json({ success: false, message: "Internal server error" })
               }
          } catch (error) {
               console.log(error);

          }
     }
}

export default UserController