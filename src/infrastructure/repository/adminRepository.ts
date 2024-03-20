import Admin from "../../domian/admin";
import AdminModel from "../dataBase/adminModel";
import AdminInterface from "../../useCase/interfaces/adminInterface";

class AdminRepository implements AdminInterface {
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