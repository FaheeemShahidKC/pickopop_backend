import Admin from "../domian/admin";
import AdminRepository from "../infrastructure/repository/adminRepository";
import IAdminRepository from "./interfaces/IAdminRepository";
import Jwt from "../infrastructure/utils/jwt";
import BcryptPassword from "../infrastructure/utils/bcryptPassword";

class AdminUseCase {
     private repository: IAdminRepository
     private jwt: Jwt
     private bcrypt: BcryptPassword

     constructor(repository: IAdminRepository, jwt: Jwt, bcrypt: BcryptPassword) {
          this.repository = repository
          this.jwt = jwt
          this.bcrypt = bcrypt
     }

     async login(email: string, password: string) {
          try {
               let foundedAdmin = await this.repository.findAdminByEmail(email)

               if (foundedAdmin) {
                    let passwordCheck: boolean = await this.bcrypt.compare(password, foundedAdmin.password)
                    if (passwordCheck) {
                         let token = this.jwt.generateToken(foundedAdmin._id as string, 'admin')
                         return { success: true, adminData: foundedAdmin, token }
                    } else {
                         return { success: false, message: "Incorrect password" }
                    }
               }
          } catch (error) {
               console.log(`error on admin login ${error}`);
               throw error;
          }
     }
}

export default AdminUseCase