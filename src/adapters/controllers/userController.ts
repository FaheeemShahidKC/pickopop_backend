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
}

export default UserController