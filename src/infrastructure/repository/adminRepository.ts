import Admin from "../../domian/admin";
import AdminModel from "../dataBase/adminModel";
import IAdminRepository from "../../useCase/interfaces/IAdminRepository";

class AdminRepository implements IAdminRepository {
     async findAdminByEmail(email: string): Promise<Admin | null> {
          try {
               let adminData = await AdminModel.findOne({ email: email })
               return adminData
          } catch (error) {
               console.log(error);
               throw new Error("Failed to find admin by email")
          }
     }
}

export default AdminRepository