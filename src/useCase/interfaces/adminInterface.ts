import Admin from "../../domian/admin";

interface AdminInterface {
     findAdminByEmail(email: string): Promise<Admin | null>
}

export default AdminInterface;