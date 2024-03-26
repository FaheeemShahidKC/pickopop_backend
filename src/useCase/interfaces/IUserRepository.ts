import User from "../../domian/user";

interface IUserRepository {
     findUserByEmail(email: string): Promise<User | null>
     saveUser(user: User): Promise<User | null>
}

export default IUserRepository