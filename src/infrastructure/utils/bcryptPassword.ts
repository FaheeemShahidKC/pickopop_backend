import { hash, compare } from 'bcrypt'

class BcryptPassword {
     async hashPassword(password: string) {
          try {
               const hashedPassword = await hash(password, 10)
               return hashedPassword
          } catch (error) {
               console.error('Error while hashing password:', error);
               throw error;
          }
     }

     async compare(password: string, encrypted: string) {
          try {
               let isValid = await compare(password, encrypted);
               return isValid;
          } catch (err) {
               console.log("Error while comapring password");
               throw err;
          }
     }
}

export default BcryptPassword