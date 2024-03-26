import IUserRepository from "../../useCase/interfaces/IUserRepository";
import User from "../../domian/user";
import UserModel from "../dataBase/userModel";

class UserRepository implements IUserRepository {
     async findUserByEmail(email: string): Promise<User | null> {
          try {
               let findedUser = await UserModel.findOne({ email: email })
               return findedUser ? findedUser.toObject() : null
          } catch (error) {
               console.log(error);
               throw new Error("Failed to find admin by email")
          }
     }

     async saveUser(user: User): Promise<User | null> {
          try {
               let savedUser = new UserModel(user)
               return savedUser ? savedUser.toObject() : null
          } catch (error) {
               console.log(error);
               throw new Error("Failed to find admin by email")
          }
     }
}

export default UserRepository