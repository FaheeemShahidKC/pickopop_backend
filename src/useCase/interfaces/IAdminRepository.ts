import Admin from "../../domian/admin";

interface IAdminRepository {
     findAdminByEmail(email: string): Promise<Admin | null>
}

export default IAdminRepository;