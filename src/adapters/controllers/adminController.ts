import { Request, Response } from "express";
import AdminUseCase from "../../useCase/adminUseCase"

class AdminController {
     private useCase;
     constructor(useCase: AdminUseCase) {
          this.useCase = useCase
     }

     async login(req: Request, res: Response) {
          try {
               const { email, password } = req.body
               let data = await this.useCase.login(email, password)
               if (data && data.success) {
                    res.status(200).json(data)
               } else {
                    res.status(401).json(data)
               }
          } catch (error) {
               console.log(error);
               res.status(500).json({ success: false, message: "Internal server error" })
          }
     }
}

export default AdminController