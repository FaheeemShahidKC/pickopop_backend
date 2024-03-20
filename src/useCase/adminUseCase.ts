import Admin from "../domian/admin";
import AdminRepository from "../infrastructure/repository/adminRepository";
import Jwt from "../infrastructure/utils/jwt";
import HashPassword from "../infrastructure/utils/hashPassword";

class AdminUseCase {
     private repository
     private jwt
     private hash

     constructor(repository: AdminRepository, jwt: Jwt, hash: HashPassword) {
          this.repository = repository
          this.jwt = jwt
          this.hash = hash
     }

     async login(email: string, password: string) {
          try {
               let foundedAdmin = await this.repository.findAdminByEmail(email)
               if (foundedAdmin) {
                    let passwordCheck: boolean = await this.hash.compare(password, foundedAdmin.password)
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