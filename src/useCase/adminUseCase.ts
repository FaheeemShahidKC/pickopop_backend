import Admin from "../domian/admin";
import AdminRepository from "../infrastructure/repository/adminRepository";
import Jwt from "../infrastructure/utils/jwt";
import BcryptPassword from "../infrastructure/utils/bcryptPassword";

class AdminUseCase {
     private repository:AdminRepository
     private jwt:Jwt
     private bcrypt:BcryptPassword

     constructor(repository: AdminRepository, jwt: Jwt, bcrypt: BcryptPassword) {
          this.repository = repository
          this.jwt = jwt
          this.bcrypt = bcrypt
     }

     async login(email: string, password: string) {
          try {
               let foundedAdmin:any = await this.repository.findAdminByEmail(email)
               if (foundedAdmin) {
                    let passwordCheck: boolean = await this.bcrypt.compare(password, foundedAdmin.password)
                    if (passwordCheck) {
                         let token = this.jwt.generateToken(foundedAdmin._id, 'admin')
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